import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'zapInToPT'; // <= Name of the test
const testDirSuffix = 'zapintopt'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;
const contractAddr = '0x6607377Bcd37Bb5681c02Ef77F514E38D52b7f5E';

// FROM : https://polygonscan.com/tx/0x3194244bc01514feeba713a42f89d5f7403968ba83fb67b4ee9b4dcdafcb9d80
const inputData = '0xff3bf0660000000000000000000000008a362aa1c81ed0ee2ae677a8b59e0f563dd290ba00000000000000000000000000000000000000000000000000000000005de38b00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000005ec34b0000000000000000000000000000000000000000000000000000018216c01b21';
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 8, // <= Define the number of steps for this test case and this device
    },
];

devices.forEach((device) => {
    processTest(device, contractName, testLabel, testDirSuffix, '', signedPlugin, serializedTx, testNetwork);
});
