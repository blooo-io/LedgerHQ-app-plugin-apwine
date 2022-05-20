import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'withdraw'; // <= Name of the test
const testDirSuffix = 'withdraw'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;

const contractAddr = '0x4ba30fa240047c17fc557b8628799068d4396790';

// // From : https://etherscan.io/tx/0x39ecdc5a8d7764c424493f9a436ba30be6b90c1953a18f1feca5c7734192dad4
const inputData = '0xf3fef3a300000000000000000000000035bbdc3fbdc26f7dfee5670af50b93c7eabce2c00000000000000000000000000000000000000000000000039e7b2a4a55140000';
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 5, // <= Define the number of steps for this test case and this device
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
