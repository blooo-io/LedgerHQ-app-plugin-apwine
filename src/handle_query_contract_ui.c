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

            if (memcmp(context->contract_address_received, CONTRACT_ADDRESS_TOKEN_PATH, ADDRESS_LENGTH) == 0)
            {
                printf_hex_array("TOKEN 1 Sent: ", ADDRESS_LENGTH, context->contract_address_received);
                printf_hex_array("TOKEN 1 Sent: ", ADDRESS_LENGTH, CONTRACT_ADDRESS_TOKEN_PATH);
                strlcpy(msg->msg, currentToken->ticker_sent, msg->msgLength);

            } else {

                printf_hex_array("TOKEN 1 Received: ", ADDRESS_LENGTH, context->contract_address_received);
                printf_hex_array("TOKEN 1 Received: ", ADDRESS_LENGTH, CONTRACT_ADDRESS_TOKEN_PATH);
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

            if (memcmp(context->contract_address_received, CONTRACT_ADDRESS_TOKEN_PATH, ADDRESS_LENGTH) != 0)
            {
                strlcpy(msg->msg, currentToken->ticker_sent, msg->msgLength);
                printf_hex_array("TOKEN 2 Sent: ", ADDRESS_LENGTH, context->contract_address_received);
                printf_hex_array("TOKEN 2 Sent: ", ADDRESS_LENGTH, CONTRACT_ADDRESS_TOKEN_PATH);
            } else {
                printf_hex_array("TOKEN 2 Received: ", ADDRESS_LENGTH, context->contract_address_received);
                printf_hex_array("TOKEN 2 Received: ", ADDRESS_LENGTH, CONTRACT_ADDRESS_TOKEN_PATH);
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

// Helper function that returns the enum corresponding to the screen that should be displayed.
static screens_t get_screen(ethQueryContractUI_t *msg,
                            apwine_parameters_t *context __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    if (index == 0) {
        return SEND_TICKER_SCREEN;
    } else if (index == 1) {
        return SEND_AMOUNT_SCREEN;
    } else if (index == 2) {
        return RECEIVE_TICKER_SCREEN;
    } else if (index == 3) {
        return RECEIVE_AMOUNT_SCREEN;
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
        case SEND_AMOUNT_SCREEN:
            set_send_amount_ui(msg, context);
            break;
        case RECEIVE_TICKER_SCREEN:
            set_receive_ticker_ui(msg, context);
            break;
        case RECEIVE_AMOUNT_SCREEN:
            set_receive_amount_ui(msg, context);
            break;
        default:
            PRINTF("Received an invalid screenIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}
