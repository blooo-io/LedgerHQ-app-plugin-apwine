import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'deposit'; // <= Name of the test
const testDirSuffix = 'deposit'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;

const contractAddr = '0x4ba30fa240047c17fc557b8628799068d4396790';

// // From : https://etherscan.io/tx/0xa44a89f6aa87654c240595a19a8d40bed7e25bd20807e4a88aa69199cdcdab60
const inputData = '0x47e7ef24000000000000000000000000894d7e0f2ecff866275a5a09ec6d44714fc74c3500000000000000000000000000000000000000000000000008f86346aa7d6fa8';
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 5, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 5, // <= Define the number of steps for this test case and this device
    },
];

devices.forEach((device) => {
    processTest(device, contractName, testLabel, testDirSuffix, '', signedPlugin, serializedTx, testNetwork);
});
