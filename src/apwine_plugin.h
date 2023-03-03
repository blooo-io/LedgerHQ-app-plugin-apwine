#pragma once

#include <string.h>
#include "eth_internals.h"
#include "eth_plugin_interface.h"

#define PARAMETER_LENGTH 32
#define SELECTOR_SIZE    4

#define RUN_APPLICATION 1

#define NUM_APWINE_SELECTORS 11
#define SELECTOR_SIZE        4

#define PLUGIN_NAME "APWine"

#define TOKEN_SENT_FOUND     1
#define TOKEN_RECEIVED_FOUND 1 << 1

// Ticker needed for APWine plugin
#define APWINE_MAX_TICKER_LEN 40

#define ETH_CHAIN_ID_LENGTH 1

// apwine uses `0xeeeee` as a dummy address to represent ETH.
extern const uint8_t APWINE_ETH_ADDRESS[ADDRESS_LENGTH];

// apwine uses 0x00000 as a dummy address to reprecent ETH.
extern const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH];

extern const uint8_t *const APWINE_SELECTORS[NUM_APWINE_SELECTORS];

extern const char network_ticker[MAX_TICKER_LEN];

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
    INCERASE_UNLOCK_TIME,
} apwineSelector_t;

typedef enum {
    SEND_TICKER_SCREEN,
    RECEIVE_TICKER_SCREEN,
    SEND_UNDERLYING_SCREEN,
    RECEIVE_PT_SCREEN,
    TOKEN_FUTURE_VAULT_SCREEN,
    WITHDRAW_FUTURE_VAULT_SCREEN,
    SEND_SCREEN,
    RECEIVE_SCREEN,
    BENEFICIARY_SCREEN,
    WARN_SCREEN,
    AMOUNT_SCREEN,
    ERROR,
} screens_t;

#define NUM_CONTRACT_ADDRESS_COLLECTION 20

typedef struct contract_address_ticker {
    uint8_t _amm[ADDRESS_LENGTH];
    char ticker_pt[APWINE_MAX_TICKER_LEN];
    char ticker_fyt[APWINE_MAX_TICKER_LEN];
    char ticker_underlying[APWINE_MAX_TICKER_LEN];
    uint8_t decimal;
} contract_address_ticker_t;
extern const contract_address_ticker_t CONTRACT_ADDRESS_COLLECTION[NUM_CONTRACT_ADDRESS_COLLECTION];

#define NUM_CONTRACT_ADDRESS_COLLECTION_2 1

typedef struct contract_address_ticker_polygon_eth {
    uint8_t _amm[ADDRESS_LENGTH];
    char ticker_eth_pt[APWINE_MAX_TICKER_LEN];
    char ticker_eth_fyt[APWINE_MAX_TICKER_LEN];
    char ticker_eth_underlying[APWINE_MAX_TICKER_LEN];
    char ticker_polygon_pt[APWINE_MAX_TICKER_LEN];
    char ticker_polygon_fyt[APWINE_MAX_TICKER_LEN];
    char ticker_polygon_underlying[APWINE_MAX_TICKER_LEN];
    uint8_t decimal;
} contract_address_ticker_polygon_eth_t;
extern const contract_address_ticker_polygon_eth_t
    CONTRACT_ADDRESS_COLLECTION_2[NUM_CONTRACT_ADDRESS_COLLECTION_2];

#define NUM_CONTRACT_ADDRESS_FUTURE_VAULT 20

typedef struct contract_address_future_vault {
    uint8_t _amm[ADDRESS_LENGTH];
    char deposit_ticker_eth[APWINE_MAX_TICKER_LEN];
    char withdraw_ticker_eth[APWINE_MAX_TICKER_LEN];
    char deposit_ticker_polygon[APWINE_MAX_TICKER_LEN];
    char withdraw_ticker_polygon[APWINE_MAX_TICKER_LEN];
    uint8_t decimal;
} contract_address_future_vault_t;

extern const contract_address_future_vault_t
    CONTRACT_ADDRESS_FUTURE_VAULT[NUM_CONTRACT_ADDRESS_FUTURE_VAULT];

// Would've loved to make this an enum but we don't have enough room because enums are `int` and not
// `uint8_t`.
#define TOKEN_SENT          0
#define TOKEN_RECEIVED      1
#define AMOUNT_SENT         2
#define AMOUNT_RECEIVED     3
#define SRC_RECEIVER        4
#define TOKEN_PATH          5
#define PAIR_PATH_LENGTH    6
#define PAIR_PATH_FIRST     7
#define PAIR_PATH_LAST      8
#define TOKEN_PATH_SENT     9
#define TOKEN_PATH_RECEIVED 10
#define NONE                11

// Number of decimals used when the token wasn't found in the CAL.
#define DEFAULT_DECIMAL WEI_TO_ETHER

// Ticker used when the token wasn't found in the CAL.
#define DEFAULT_TICKER ""

// Shared global memory with Ethereum app. Must be at most 5 * 32 bytes.
typedef struct apwine_parameters_t {
    uint8_t amount_sent[INT256_LENGTH];
    uint8_t amount_received[INT256_LENGTH];
    uint8_t contract_address_sent[ADDRESS_LENGTH];
    uint8_t contract_address_received[ADDRESS_LENGTH];
    char ticker_sent[MAX_TICKER_LEN];
    char ticker_received[MAX_TICKER_LEN];

    // 32 * 2 + 20 * 2 + 12 * 2 == 64 + 40 + 24 == 128
    // 32 * 5 == 160 bytes so there are 160 - 128 == 32 bytes left.

    uint16_t offset;
    uint16_t checkpoint;
    uint16_t array_len;
    uint8_t next_param;
    uint8_t valid;
    uint8_t tokens_found;
    uint8_t decimals_sent;
    uint8_t decimals_received;
    uint8_t selectorIndex;
    uint8_t pair_path_first;
    uint8_t pair_path_last;
    uint8_t token_path_sent;
    uint8_t token_path_received;
    uint8_t skip;
    // 12 * 1b + 2 * 2b == 12 + 4 == 16 bytes. There are 32 - 16 == 16 byte left.
} apwine_parameters_t;

// Piece of code that will check that the above structure is not bigger than 5 * 32. Do not remove
// this check.
_Static_assert(sizeof(apwine_parameters_t) <= 5 * 32, "Structure of parameters too big.");

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