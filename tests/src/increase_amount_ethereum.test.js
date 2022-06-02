import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'increaseAmount'; // <= Name of the test
const testDirSuffix = 'increase_amount'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;
const contractAddr = '0xc5ca1ebf6e912e49a6a70bb0385ea065061a4f09';

const inputData = '0x4957677c000000000000000000000000000000000000000000000b886df912341f500000';
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
