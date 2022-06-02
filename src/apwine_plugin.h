#pragma once

#include <string.h>
#include "eth_internals.h"
#include "eth_plugin_interface.h"

#define PARAMETER_LENGTH 32
#define SELECTOR_SIZE    4

#define RUN_APPLICATION 1

#define NUM_APWINE_SELECTORS 10
#define SELECTOR_SIZE        4

#define PLUGIN_NAME "APWine"

#define TOKEN_SENT_FOUND     1
#define TOKEN_RECEIVED_FOUND 1 << 1

// Ticker needed for APWine plugin
#define APWINE_MAX_TICKER_LEN 30

// apwine uses `0xeeeee` as a dummy address to represent ETH.
extern const uint8_t APWINE_ETH_ADDRESS[ADDRESS_LENGTH];

// apwine uses 0x00000 as a dummy address to reprecent ETH.
extern const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH];

// Indicate which token is send and received
extern const uint8_t CONTRACT_ADDRESS_TOKEN_PATH[ADDRESS_LENGTH];

extern const uint8_t *const APWINE_SELECTORS[NUM_APWINE_SELECTORS];

// Returns 1 if corresponding address is the apwine address for the chain token (ETH, BNB, MATIC,
// etc.. are 0xeeeee...).
#define ADDRESS_IS_NETWORK_TOKEN(_addr)                    \
    (!memcmp(_addr, APWINE_ETH_ADDRESS, ADDRESS_LENGTH) || \
     !memcmp(_addr, NULL_ETH_ADDRESS, ADDRESS_LENGTH))

typedef enum {
    SWAP_EXACT_AMOUNT_IN,
    SWAP_EXACT_AMOUNT_OUT,
    ADD_LIQUIDITY,
    REMOVE_LIQUIDITY,
    DEPOSIT,
    WITHDRAW,
    ZAPINTOPT,
    REDEEM_YIELD,
    INCREASE_AMOUNT,
    CREATE_LOCK,
} apwineSelector_t;

typedef enum {
    SEND_TICKER_SCREEN,
    RECEIVE_TICKER_SCREEN,
    SEND_SCREEN,
    RECEIVE_SCREEN,
    BENEFICIARY_SCREEN,
    WARN_SCREEN,
    AMOUNT_SCREEN,
    ERROR,
} screens_t;

#define NUM_CONTRACT_ADDRESS_COLLECTION 14

typedef struct contract_address_ticker {
    uint8_t _amm[ADDRESS_LENGTH];
    char ticker_sent[APWINE_MAX_TICKER_LEN];
    char ticker_received[APWINE_MAX_TICKER_LEN];
    uint8_t decimal;
} contract_address_ticker_t;
extern const contract_address_ticker_t CONTRACT_ADDRESS_COLLECTION[NUM_CONTRACT_ADDRESS_COLLECTION];

// Would've loved to make this an enum but we don't have enough room because enums are `int` and not
// `uint8_t`.
#define TOKEN_SENT      0
#define AMOUNT_SENT     1
#define AMOUNT_RECEIVED 2
#define TOKEN_RECEIVED  3
#define NONE            4
#define TOKEN_PATH      5

// Number of decimals used when the token wasn't found in the CAL.
#define DEFAULT_DECIMAL WEI_TO_ETHER

// Ticker used when the token wasn't found in the CAL.
#define DEFAULT_TICKER ""

// Shared global memory with Ethereum app. Must be at most 5 * 32 bytes.
typedef struct apwine_parameters_t {
    uint8_t amount_sent[INT256_LENGTH];
    uint8_t amount_received[INT256_LENGTH];
    uint8_t beneficiary[ADDRESS_LENGTH];
    uint8_t contract_address_sent[ADDRESS_LENGTH];
    uint8_t contract_address_received[ADDRESS_LENGTH];
    char ticker_sent[MAX_TICKER_LEN];
    char ticker_received[MAX_TICKER_LEN];

    // 32 * 2 + 20 * 3 + 12 * 2 == 64 + 60 + 24 == 144
    // 32 * 5 == 160 bytes so there are 160 - 144 == 16 bytes left.

    uint16_t offset;
    uint16_t checkpoint;
    uint8_t next_param;
    uint8_t tokens_found;
    uint8_t valid;
    uint8_t decimals_sent;
    uint8_t decimals_received;
    uint8_t selectorIndex;
    uint8_t skip;
    // 4 * 1 + 2 * 2 + 7 * 1 == 8 + 7 == 15 bytes. There are 16 - 15 == 1 byte left.
} apwine_parameters_t;

void handle_provide_parameter(void *parameters);
void handle_query_contract_ui(void *parameters);
void apwine_plugin_call(int message, void *parameters);
void handle_finalize(void *parameters);
void handle_init_contract(void *parameters);
void handle_provide_token(void *parameters);
void handle_query_contract_id(void *parameters);

static inline void printf_hex_array(const char *title __attribute__((unused)),
                                    size_t len __attribute__((unused)),
                                    const uint8_t *data __attribute__((unused))) {
    PRINTF(title);
    for (size_t i = 0; i < len; ++i) {
        PRINTF("%02x", data[i]);
    };
    PRINTF("\n");
}