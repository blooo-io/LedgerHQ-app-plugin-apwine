#include "apwine_plugin.h"

static void set_send_ticker_ui(ethQueryContractUI_t *msg, apwine_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
        case SWAP_EXACT_AMOUNT_OUT:
            strlcpy(msg->title, "Token Send", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
    contract_address_ticker_t *currentToken = NULL;
    for (uint8_t i = 0; i < NUM_CONTRACT_ADDRESS_COLLECTION; i++) {
        currentToken = (contract_address_ticker_t *) PIC(&CONTRACT_ADDRESS_COLLECTION[i]);
        if (memcmp(currentToken->_amm, context->contract_address_sent, ADDRESS_LENGTH) == 0) {
            if (memcmp(context->contract_address_received,
                       CONTRACT_ADDRESS_TOKEN_PATH,
                       ADDRESS_LENGTH) == 0){
                strlcpy(msg->msg, currentToken->ticker_sent, msg->msgLength);

            } else {
                strlcpy(msg->msg, currentToken->ticker_received, msg->msgLength);
            }
        }
    }
}

static void set_receive_ticker_ui(ethQueryContractUI_t *msg, apwine_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
        case SWAP_EXACT_AMOUNT_OUT:
            strlcpy(msg->title, "Token Receive", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", &context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
    contract_address_ticker_t *currentToken = NULL;
    for (uint8_t i = 0; i < NUM_CONTRACT_ADDRESS_COLLECTION; i++) {
        currentToken = (contract_address_ticker_t *) PIC(&CONTRACT_ADDRESS_COLLECTION[i]);

        if (memcmp(currentToken->_amm, context->contract_address_sent, ADDRESS_LENGTH) == 0) {
            if (memcmp(context->contract_address_received,
                       CONTRACT_ADDRESS_TOKEN_PATH,
                       ADDRESS_LENGTH) != 0){
                strlcpy(msg->msg, currentToken->ticker_sent, msg->msgLength);
            } else {
                strlcpy(msg->msg, currentToken->ticker_received, msg->msgLength);
            }
        }
    }
}

// Set UI for "Send" screen.
static void set_send_amount_ui(ethQueryContractUI_t *msg, apwine_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
        case SWAP_EXACT_AMOUNT_OUT:
            strlcpy(msg->title, "Amount In", msg->titleLength);
            break;
        case REMOVE_LIQUIDITY:
            strlcpy(msg->title, "Amount Out 1", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    // Convert to string.
    amountToString(context->amount_sent,
                   INT256_LENGTH,
                   context->decimals_sent,
                   "",
                   msg->msg,
                   msg->msgLength);
}

// Set UI for "Receive" screen.
static void set_receive_amount_ui(ethQueryContractUI_t *msg, apwine_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
        case SWAP_EXACT_AMOUNT_OUT:
            strlcpy(msg->title, "Amount Out", msg->titleLength);
            break;
        case REMOVE_LIQUIDITY:
            strlcpy(msg->title, "Amount Out 2", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    // Convert to string.
    amountToString(context->amount_received,
                   INT256_LENGTH,
                   context->decimals_received,
                   "",
                   msg->msg,
                   msg->msgLength);
}

// Set UI for "Warning" screen.
static void set_warning_ui(ethQueryContractUI_t *msg,
                           const apwine_parameters_t *context __attribute__((unused))) {
    strlcpy(msg->title, "WARNING", msg->titleLength);
    strlcpy(msg->msg, "Unknown token", msg->msgLength);
}

// Helper function that returns the enum corresponding to the screen that should be displayed.
static screens_t get_screen(ethQueryContractUI_t *msg,
                            apwine_parameters_t *context __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    bool token_sent_found = context->tokens_found & TOKEN_SENT_FOUND;
    bool token_received_found = context->tokens_found & TOKEN_RECEIVED_FOUND;

    bool both_tokens_found = token_received_found && token_sent_found;
    bool both_tokens_not_found = !token_received_found && !token_sent_found;

    switch (index) {
        case 0:
            if (both_tokens_found) {
                return SEND_SCREEN;
            } else if (both_tokens_not_found) {
                return WARN_SCREEN;
            } else if (token_sent_found) {
                return SEND_SCREEN;
            } else if (token_received_found) {
                return WARN_SCREEN;
            }
            break;
        case 1:
            if (both_tokens_found) {
                return RECEIVE_SCREEN;
            } else if (both_tokens_not_found) {
                return SEND_SCREEN;
            } else if (token_sent_found) {
                return WARN_SCREEN;
            } else if (token_received_found) {
                return SEND_SCREEN;
            }
            break;
        case 2:
            if (both_tokens_found) {
                return BENEFICIARY_SCREEN;
            } else if (both_tokens_not_found) {
                return WARN_SCREEN;
            } else {
                return RECEIVE_SCREEN;
            }
        case 3:
            if (both_tokens_found) {
                return ERROR;
            } else if (both_tokens_not_found) {
                return RECEIVE_SCREEN;
            } else {
                return BENEFICIARY_SCREEN;
            }
        case 4:
            if (both_tokens_not_found) {
                return BENEFICIARY_SCREEN;
            } else {
                return ERROR;
            }
        default:
            return ERROR;
    }
    return ERROR;
}

void handle_query_contract_ui(void *parameters) {
    ethQueryContractUI_t *msg = (ethQueryContractUI_t *) parameters;
    apwine_parameters_t *context = (apwine_parameters_t *) msg->pluginContext;

    memset(msg->title, 0, msg->titleLength);
    memset(msg->msg, 0, msg->msgLength);
    msg->result = ETH_PLUGIN_RESULT_OK;

    screens_t screen = get_screen(msg, context);
    switch (screen) {
        case SEND_TICKER_SCREEN:
            set_send_ticker_ui(msg, context);
            break;
        case SEND_SCREEN:
            set_send_amount_ui(msg, context);
            break;
        case RECEIVE_TICKER_SCREEN:
            set_receive_ticker_ui(msg, context);
            break;
        case RECEIVE_SCREEN:
            set_receive_amount_ui(msg, context);
            break;
        case WARN_SCREEN:
            set_warning_ui(msg, context);
            break;
        default:
            PRINTF("Received an invalid screenIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}
