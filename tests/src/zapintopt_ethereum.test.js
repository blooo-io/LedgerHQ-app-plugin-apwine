import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'zapInToPT'; // <= Name of the test
const testDirSuffix = 'zapintopt'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;
const contractAddr = '0x588e3c5f6259dd1f903ad8f38168a18f8fb7edd6';

const selector = '0xff3bf066';
const amm = '000000000000000000000000c9e973e12b8cd09f18c5325dda9ac175ab1b5d3a';
const amount = '0000000000000000000000000000000000000000000000039e7b2a4a55140000';
const inputs = '0000000000000000000000000000000000000000000000000000000000000080';
const referralRecipient = '000000000000000000000000c9e973e12b8cd09f18c5325dda9ac175ab1b5d3a';
const inputsLength = '0000000000000000000000000000000000000000000000000000000000000002';
const inputsData1 = '0000000000000000000000000000000000000000000000039e7b2a4a55140000';
const inputsData2 = '0000000000000000000000000000000000000000000000000000000000000001';

const inputData = selector + amm + amount + inputs + referralRecipient + inputsLength + inputsData1 + inputsData2;
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
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 7, // <= Define the number of steps for this test case and this device
    },
];

devices.forEach((device) => {
    processTest(device, contractName, testLabel, testDirSuffix, '', signedPlugin, serializedTx, testNetwork);
});
