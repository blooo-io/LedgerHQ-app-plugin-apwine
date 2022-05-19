#include "apwine_plugin.h"

// Called once to init.
void handle_init_contract(void *parameters) {
    ethPluginInitContract_t *msg = (ethPluginInitContract_t *) parameters;

    if (msg->interfaceVersion != ETH_PLUGIN_INTERFACE_VERSION_LATEST) {
        msg->result = ETH_PLUGIN_RESULT_UNAVAILABLE;
        return;
    }

    if (msg->pluginContextLength < sizeof(apwine_parameters_t)) {
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        return;
    }

    apwine_parameters_t *context = (apwine_parameters_t *) msg->pluginContext;
    memset(context, 0, sizeof(*context));
    context->valid = 1;

    // Determine a function to call
    size_t i;
    for (i = 0; i < NUM_APWINE_SELECTORS; i++) {
        if (memcmp((uint8_t *) PIC(APWINE_SELECTORS[i]), msg->selector, SELECTOR_SIZE) == 0) {
            context->selectorIndex = i;
            break;
        }
    }

    if (i == NUM_APWINE_SELECTORS) {
        // Selector was not found
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        return;
    }

    // Set `next_param` to be the first field we expect to parse.
    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
            context->next_param = TOKEN_SENT;
            break;
        case SWAP_EXACT_AMOUNT_OUT:
            context->next_param = TOKEN_SENT;
            break;
        case ADD_LIQUIDITY:
            context->skip = 2;
            context->next_param = AMOUNT_SENT;
            break;
        case REMOVE_LIQUIDITY:
            context->skip = 2;
            context->next_param = AMOUNT_SENT;
            break;
        default:
            PRINTF("Missing selectorIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}