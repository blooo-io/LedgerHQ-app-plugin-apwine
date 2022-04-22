#include "apwine_plugin.h"

void handle_swap_exact_tokens(apwine_parameters_t *context) {
    contract_address_ticker_t *currentToken = NULL;
    for (uint8_t i = 0; i < NUM_CONTRACT_ADDRESS_COLLECTION; i++) {
        currentToken = (contract_address_ticker_t *) PIC(&CONTRACT_ADDRESS_COLLECTION[i]);
        if (memcmp(currentToken->_amm, context->contract_address_sent, ADDRESS_LENGTH) == 0) {
            context->decimals_sent = currentToken->decimal;
            context->decimals_received = currentToken->decimal;
            break;
        } else {
            context->decimals_sent = WEI_TO_ETHER;
            context->decimals_received = WEI_TO_ETHER;
        }
    }
}

void handle_provide_token(void *parameters) {
    ethPluginProvideInfo_t *msg = (ethPluginProvideInfo_t *) parameters;
    apwine_parameters_t *context = (apwine_parameters_t *) msg->pluginContext;
    PRINTF("APWINE plugin provide token: 0x%p, 0x%p\n", msg->item1, msg->item2);

    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
        case SWAP_EXACT_AMOUNT_OUT:
            handle_swap_exact_tokens(context);
            break;
        default:
            break;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}