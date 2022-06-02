import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'createLock'; // <= Name of the test
const testDirSuffix = 'create_lock'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;
const contractAddr = '0xc5ca1ebf6e912e49a6a70bb0385ea065061a4f09';

// FROM : https://etherscan.io/tx/0x885e1ec1f1770d8b1731280e0cf310e667157d604367d72c8b99ff006107327f
const inputData = '0x65fc38730000000000000000000000000000000000000000000004e50bd457f5f03d1a61000000000000000000000000000000000000000000000000000000006449bb00';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 6, // <= Define the number of steps for this test case and this device
    },
];

devices.forEach((device) => {
    processTest(device, contractName, testLabel, testDirSuffix, '', signedPlugin, serializedTx, testNetwork);
});
