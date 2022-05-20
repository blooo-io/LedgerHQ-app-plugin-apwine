#include "apwine_plugin.h"

// Store the amount sent in the form of a string, without any ticker or decimals. These will be
// added when displaying.
static void handle_amount_sent(ethPluginProvideParameter_t *msg, apwine_parameters_t *context) {
    memcpy(context->amount_sent, msg->parameter, INT256_LENGTH);
    printf_hex_array("AMOUNT SENT: ", INT256_LENGTH, context->amount_sent);
}

// Store the amount received in the form of a string, without any ticker or decimals. These will be
// added when displaying.
static void handle_amount_received(ethPluginProvideParameter_t *msg, apwine_parameters_t *context) {
    memcpy(context->amount_received, msg->parameter, PARAMETER_LENGTH);
    printf_hex_array("AMOUNT RECEIVED: ", PARAMETER_LENGTH, context->amount_received);
}

static void handle_token_sent(ethPluginProvideParameter_t *msg, apwine_parameters_t *context) {
    memset(context->contract_address_sent, 0, sizeof(context->contract_address_sent));
    memcpy(context->contract_address_sent,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           ADDRESS_LENGTH);
    printf_hex_array("TOKEN SENT: ", ADDRESS_LENGTH, context->contract_address_sent);
}

static void handle_token_received(ethPluginProvideParameter_t *msg, apwine_parameters_t *context) {
    memset(context->contract_address_received, 0, sizeof(context->contract_address_received));
    memcpy(context->contract_address_received,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           ADDRESS_LENGTH);
    printf_hex_array("TOKEN RECEIVED: ", ADDRESS_LENGTH, context->contract_address_received);
}

static void handle_swap_exact_amount(ethPluginProvideParameter_t *msg,
                                     apwine_parameters_t *context) {
    switch (context->next_param) {
        case TOKEN_SENT:  // _amm
            handle_token_sent(msg, context);
            context->next_param = TOKEN_PATH;
            context->skip = 1;  // skip _pairPath
            break;
        case TOKEN_PATH:  // _tokenPath
            context->next_param = AMOUNT_SENT;
            break;
        case AMOUNT_SENT:  // _tokenAmountIn
            handle_amount_sent(msg, context);
            context->next_param = AMOUNT_RECEIVED;
            break;
        case AMOUNT_RECEIVED:  // _minAmountOut
            handle_amount_received(msg, context);
            context->next_param = TOKEN_RECEIVED;
            context->skip = 6;  // skip _to, _deadline, _referralRecipient, _pairPath length,
                                // _pairpath data and _tokenPath length
            break;
        case TOKEN_RECEIVED:  // _tokenPath data
            handle_token_received(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

static void handle_remove_liquidity(ethPluginProvideParameter_t *msg,
                                    apwine_parameters_t *context) {
    switch (context->next_param) {
        case AMOUNT_SENT:  // _minAmountsOut[0] will be copied in AMOUNT_SENT
            handle_amount_sent(msg, context);
            // We call the handle_token method to print "Unknown Token"
            handle_token_sent(msg, context);
            context->next_param = AMOUNT_RECEIVED;
            break;
        case AMOUNT_RECEIVED:  // _minAmountsOut[1]
            handle_amount_received(msg, context);
            // We call the handle_token method to print "Unknown Token"
            handle_token_received(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

static void handle_add_liquidity(ethPluginProvideParameter_t *msg, apwine_parameters_t *context) {
    switch (context->next_param) {
        case AMOUNT_SENT:  // _minAmountsIn[0] will be copied in AMOUNT_SENT
            handle_amount_sent(msg, context);
            // We call the handle_token method to print "Unknown Token"
            handle_token_sent(msg, context);
            context->next_param = AMOUNT_RECEIVED;
            break;
        case AMOUNT_RECEIVED:  // _minAmountsIn[1]
            handle_amount_received(msg, context);
            // We call the handle_token method to print "Unknown Token"
            handle_token_received(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

static void handle_deposit_withdraw(ethPluginProvideParameter_t *msg,
                                    apwine_parameters_t *context) {
    switch (context->next_param) {
        case TOKEN_SENT:  // _futureVault
            handle_token_sent(msg, context);
            context->next_param = AMOUNT_SENT;
            break;
        case AMOUNT_SENT:  // _amount
            handle_amount_sent(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

static void handle_zapintopt(ethPluginProvideParameter_t *msg,
                             apwine_parameters_t *context) {
    switch (context->next_param) {
        case AMOUNT_SENT:  // _amount
            handle_amount_sent(msg, context);
            // We call the handle_token method to print "Unknown Token"
            handle_token_sent(msg, context);
            context->next_param = AMOUNT_RECEIVED;
            context->skip = 3;
            break;
        case AMOUNT_RECEIVED:  // _inputs[0]
            handle_amount_received(msg, context);
            // We call the handle_token method to print "Unknown Token"
            handle_token_received(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

void handle_provide_parameter(void *parameters) {
    ethPluginProvideParameter_t *msg = (ethPluginProvideParameter_t *) parameters;
    apwine_parameters_t *context = (apwine_parameters_t *) msg->pluginContext;
    printf_hex_array("apwine plugin provide parameter: ", PARAMETER_LENGTH, msg->parameter);

    msg->result = ETH_PLUGIN_RESULT_OK;

    if (context->skip) {
        // Skip this step, and don't forget to decrease skipping counter.
        context->skip--;
    } else {
        if ((context->offset) && msg->parameterOffset != context->checkpoint + context->offset) {
            PRINTF("offset: %d, checkpoint: %d, parameterOffset: %d\n",
                   context->offset,
                   context->checkpoint,
                   msg->parameterOffset);
            return;
        }

        context->offset = 0;  // Reset offset
        switch (context->selectorIndex) {
            case SWAP_EXACT_AMOUNT_IN:
            case SWAP_EXACT_AMOUNT_OUT:
                handle_swap_exact_amount(msg, context);
                break;
            case REMOVE_LIQUIDITY:
                handle_remove_liquidity(msg, context);
                break;
            case ADD_LIQUIDITY:
                handle_add_liquidity(msg, context);
                break;
            case DEPOSIT:
            case WITHDRAW:
                handle_deposit_withdraw(msg, context);
                break;
            case ZAPINTOPT:
                handle_zapintopt(msg, context);
                break;
            default:
                PRINTF("Selector Index %d not supported\n", context->selectorIndex);
                msg->result = ETH_PLUGIN_RESULT_ERROR;
                break;
        }
    }
}