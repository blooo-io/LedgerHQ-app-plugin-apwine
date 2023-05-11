# Badges
[![Code style check](https://github.com/blooo-io/LedgerHQ-app-plugin-apwine/actions/workflows/lint-workflow.yml/badge.svg)](https://github.com/blooo-io/LedgerHQ-app-plugin-apwine/actions/workflows/lint-workflow.yml)
[![Compilation & tests](https://github.com/blooo-io/LedgerHQ-app-plugin-apwine/actions/workflows/ci-workflow.yml/badge.svg)](https://github.com/blooo-io/LedgerHQ-app-plugin-apwine/actions/workflows/ci-workflow.yml)

# Ledger APWine Plugin

This is a plugin for the Ethereum application which helps parsing and displaying relevant information when signing a APWine transaction.

## Prerequisite

Clone the plugin to a new folder.

```shell
git clone --recurse-submodules https://github.com/blooo-io/LedgerHQ-app-plugin-apwine.git
```

Then in the same folder clone two more repositories, which is the plugin-tools and app-ethereum.

```shell
git clone https://github.com/LedgerHQ/plugin-tools.git                          #plugin-tools
git clone --recurse-submodules https://github.com/LedgerHQ/app-ethereum.git     #app-ethereum
```
## Documentation

Need more information about the interface, the architecture, or general stuff about ethereum plugins? You can find more about them in the [ethereum-app documentation](https://github.com/LedgerHQ/app-ethereum/blob/master/doc/ethapp_plugins.asc).

## Smart Contracts

Smart contracts covered by this plugin are:

| Network | Version | Smart Contract |
| ---       | --- | --- |
| Ethereum  | V0.8.2  | `0x4bA30FA240047c17FC557b8628799068d4396790`|
| Ethereum  | v0.6.8  | `0xf5ba2e5dded276fc0f7a7637a61157a4be79c626`|
| Ethereum  | v0.6.8  | `0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba`|
| Ethereum  | V0.6.8  | `0x1a6525e4a4ab2e3aea7ed3cf813e8ed07fa3446d`|
| Ethereum  | V0.6.8  | `0xea851503ff416e34585d28c248918344c569b219`|
| Ethereum  | V0.6.8  | `0x4df9bb881e5e61034001440aaaff2fb2932e2883`|
| Ethereum  | V0.6.8  | `0x1089f7bbf8c680db92759a30d42ddfba7c794bd2`|
| Ethereum  | V0.6.8  | `0xbc35b70ccc8ef4ec1ccc34fab60ccbba162011e4`|
| Ethereum  | V0.6.8  | `0xcba960001307a16ce8a9e326d73e92d53b446e81`|
| Ethereum  | V0.6.8  | `0x49cbbfedb15b5c22cac53daf104512a5de9c8457`|
| Ethereum  | V0.6.8  | `0xb932c4801240753604c768c991eb640bcd7c06eb`|
| Ethereum  | V0.6.8  | `0x839bb033738510aa6b4f78af20f066bdc824b189`|
| Ethereum  | V0.6.8  | `0x0cc36e3cc5eaca6d046b537703ae946874d57299`|
| Ethereum  | V0.6.8  | `0xa4085c106c7a9a7ad0574865bbd7cac5e1098195`|
| Ethereum  | V0.6.8  | `0x1604c5e9ab488d66e983644355511dcef5c32edf`|
| Ethereum  | V0.6.8  | `0xc61c0f4961f2093a083f47a4b783ad260deaf7ea`|
| Ethereum  | V0.8.2  | `0x588e3c5f6259dd1f903ad8f38168a18f8fb7edd6`|
| Ethereum  | V0.8.2  | `0x04e5cc506aabe6434603d73d4f796e934ca05ade`|
| Ethereum  | V0.8.2  | `0x6afc7a02263ae867c09c87b850c21494a546b4f1`|
| Ethereum  | V0.8.2  | `0xb2ed3e50b2811667e4e40951592df8cb1f6d4fca`|
| Ethereum  | V0.8.2  | `0xbf0e70f0435d0418de3b6209920e434af5e6ff78`|
| Ethereum  | V0.8.2  | `0xd0d71d6650dabe0b5afaba97dd980727574c2812`|
| Ethereum  | V0.8.2  | `0x1138877f7ae0c43ec98ce56c8e5fb74fae8486e1`|
| Ethereum  | V0.8.2  | `0xb6710a940908503e24166a4ab5bf7cf391fa153f`|
| Ethereum  | V0.8.2  | `0x7c3385a43ef207ea635fb8aa49be99e6aba6f8b6`|
| Ethereum  | V0.8.2  | `0xcbd1de3b69f80a407c0423226716bfea6aaaa7d7`|
| Ethereum  | V0.8.2  | `0x0adb804fe292af95c05e3c03e6ea372116b37d69`|
| Ethereum  | V0.8.2  | `0xb9af29f981b4a69de421f5d8da46c2c7c473c67c`|
| Ethereum  | V0.8.2  | `0x33b22e2cc0af29befdcfdd0abfb9b1dae23b4141`|
| Ethereum  | V0.8.2  | `0x5b7db209194414450be045ea34f25f45f1847bbf`|
| Ethereum  | V0.2.4  | `0xc5ca1ebf6e912e49a6a70bb0385ea065061a4f09`|
| Polygon   | V0.6.8  | `0x790a0ca839dc5e4690c8c58cb57fd2beca419afc`|
| Polygon   | V0.6.8  | `0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba`|
| Polygon   | V0.6.8  | `0x91e94e5e3baa054f92bac48a9c05e6228de1fcac`|
| Polygon   | V0.6.8  | `0x7429e160aa4ab7bbec65c101bd2624c8cba8a2f6`|
| Polygon   | V0.6.8  | `0xc68b6987075944f9e8b0a6c2b52e923bc1fb9028`|
| Polygon   | V0.6.8  | `0x1604c5e9ab488d66e983644355511dcef5c32edf`|
| Polygon   | V0.6.8  | `0x4bf982f43994033e8c4e2c36d00c776b550e76c3`|
| Polygon   | V0.6.8  | `0x2df9cf57ac79a76a2e8d944b623a9f324af85ab8`|
| Polygon   | V0.8.2  | `0x4ba30fa240047c17fc557b8628799068d4396790`|
| Polygon   | V0.8.2  | `0x6607377bcd37bb5681c02ef77f514e38d52b7f5e`|
| Polygon   | V0.8.2  | `0x67952e78f2d3d2c38c190c56ebcbc116b70010e6`|
| Polygon   | V0.8.2  | `0x1421cf43731e0e6eb7c5c04d2f715515eca4dabf`|
| Polygon   | V0.8.2  | `0x982375f00f286d14cbe8633a58f0bab710be1449`|
| Polygon   | V0.8.2  | `0x668cdd65aeb2eb4cda2997bd0f86397f7bfc33f1`|
| Polygon   | V0.8.2  | `0x08a8a1bd52fca31d047484b40a7026c8f064066e`|
| Polygon   | V0.8.2  | `0xb9af29f981b4a69de421f5d8da46c2c7c473c67c`|
| Polygon   | V0.8.2  | `0x33b22e2cc0af29befdcfdd0abfb9b1dae23b4141`|
| Polygon   | V0.8.2  | `0x5b7db209194414450be045ea34f25f45f1847bbf`|


## Build

Go to the plugin-tools folder and run the "./start" script.
```shell
cd plugin-tools  # go to plugin folder
./start.sh       # run the script start.sh
```
The script will build a docker image and attach a console.
When the docker image is running go to the "LedgerHQ-app-plugin-apwine" folder and build the ".elf" files.
```shell
cd LedgerHQ-app-plugin-apwine/tests   # go to the tests folder in LedgerHQ-app-plugin-apwine
./build_local_test_elfs.sh            # run the script build_local_test_elfs.sh
```

## Tests

To test the plugin go to the tests folder from the "LedgerHQ-app-plugin-apwine" and run the script "test"
```shell
cd LedgerHQ-app-plugin-apwine/tests       # go to the tests folder in LedgerHQ-app-plugin-apwine
yarn test                                 # run the script test
```

## Graphics & Icons
[icons](docs/Ledger%20Manager%20icon%20template.ai)
## Continuous Integration


The flow processed in [GitHub Actions](https://github.com/features/actions) is the following:

- Code formatting with [clang-format](http://clang.llvm.org/docs/ClangFormat.html)
- Compilation of the application for Ledger Nano S in [ledger-app-builder](https://github.com/LedgerHQ/ledger-app-builder)
