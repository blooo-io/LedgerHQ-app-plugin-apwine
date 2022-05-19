#include "apwine_plugin.h"

void handle_query_contract_id(void *parameters) {
    ethQueryContractID_t *msg = (ethQueryContractID_t *) parameters;
    apwine_parameters_t *context = (apwine_parameters_t *) msg->pluginContext;

    strlcpy(msg->name, PLUGIN_NAME, msg->nameLength);

    switch (context->selectorIndex) {
        case SWAP_EXACT_AMOUNT_IN:
            strlcpy(msg->version, "Swap Exact Amount In", msg->versionLength);
            break;
        case SWAP_EXACT_AMOUNT_OUT:
            strlcpy(msg->version, "Swap Exact Amount Out", msg->versionLength);
            break;
        case ADD_LIQUIDITY:
            strlcpy(msg->version, "Add Liquidity", msg->versionLength);
            break;
        case REMOVE_LIQUIDITY:
            strlcpy(msg->version, "Remove Liquidity", msg->versionLength);
            break;
        default:
            PRINTF("Selector Index :%d not supported!\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}
