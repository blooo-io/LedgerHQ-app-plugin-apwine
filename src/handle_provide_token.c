#include "apwine_plugin.h"

// static void sent_network_token(apwine_parameters_t *context) {
//     context->decimals_sent = WEI_TO_ETHER;
//     context->tokens_found |= TOKEN_SENT_FOUND;
// }

// static void received_network_token(apwine_parameters_t *context) {
//     context->decimals_received = WEI_TO_ETHER;
//     context->tokens_found |= TOKEN_RECEIVED_FOUND;
// }

void handle_exact_tokens(apwine_parameters_t *context) {
    contract_address_ticker_t *currentToken = NULL;
    for (uint8_t i = 0; i < NUM_CONTRACT_ADDRESS_COLLECTION; i++) {
        currentToken = (contract_address_ticker_t *) PIC(&CONTRACT_ADDRESS_COLLECTION[i]);
        if (memcmp(currentToken->_amm, context->contract_address_sent, ADDRESS_LENGTH) == 0) {
            strlcpy(context->ticker_sent,
                    (char *) currentToken->ticker_sent,
                    sizeof(context->ticker_sent));
            context->decimals_sent = currentToken->decimal;
            strlcpy(context->ticker_received,
                    (char *) currentToken->ticker_received,
                    sizeof(context->ticker_received));
            break;
        } else {
            context->decimals_sent = WEI_TO_ETHER;
            context->decimals_received = WEI_TO_ETHER;
            strlcpy(context->ticker_received, DEFAULT_TICKER, sizeof(context->ticker_sent));
            strlcpy(context->ticker_sent, DEFAULT_TICKER, sizeof(context->ticker_sent));
        }
    }
}

// void handle_exact_tokens_received(apwine_parameters_t *context) {
//     contract_address_ticker_t *currentToken = NULL;

//     for (uint8_t i = 0; i < NUM_CONTRACT_ADDRESS_COLLECTION; i++) {
//         currentToken = (contract_address_ticker_t *) PIC(&CONTRACT_ADDRESS_COLLECTION[i]);
//         context->decimals_received = currentToken->decimal;
//         if (memcmp(currentToken->_to, context->contract_address_received, ADDRESS_LENGTH) == 0) {
//             strlcpy(context->ticker_received,
//                     (char *) currentToken->ticker_received,
//                     sizeof(context->ticker_received));
//             break;
//         } else {
//             context->decimals_received = context->decimals_sent;
//             strlcpy(context->ticker_received, DEFAULT_TICKER, sizeof(context->ticker_sent));
//         }
//     }
// }

void handle_provide_token(void *parameters) {
    ethPluginProvideInfo_t *msg = (ethPluginProvideInfo_t *) parameters;
    apwine_parameters_t *context = (apwine_parameters_t *) msg->pluginContext;
    PRINTF("APWINE plugin provide token: 0x%p, 0x%p\n", msg->item1, msg->item2);

    // if (ADDRESS_IS_NETWORK_TOKEN(context->contract_address_sent)) {
    //     sent_network_token(context);
    // } else if (msg->item1 != NULL) {
    //     context->decimals_sent = msg->item1->token.decimals;
    //     strlcpy(context->ticker_sent,
    //             (char *) msg->item1->token.ticker,
    //             sizeof(context->ticker_sent));
    //     context->tokens_found |= TOKEN_SENT_FOUND;
    // } else {
    //     handle_exact_tokens(context);
    // }

    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
            handle_exact_tokens(context);
            break;
        default:
            break;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}