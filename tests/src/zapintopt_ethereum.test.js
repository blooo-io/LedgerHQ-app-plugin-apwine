import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'zapInToPT'; // <= Name of the test
const testDirSuffix = 'zapintopt'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;
const contractAddr = '0x588e3c5f6259dd1f903ad8f38168a18f8fb7edd6';

const selector = '0xff3bf066';
const amm = '0000000000000000000000008a362aa1c81ed0ee2ae677a8b59e0f563dd290ba';
const amount = '00000000000000000000000000000000000000000000000000000000005de38b';
const inputs = '0000000000000000000000000000000000000000000000000000000000000080';
const referralRecipient = '0000000000000000000000000000000000000000000000000000000000000000';
const inputsLength = '0000000000000000000000000000000000000000000000000000000000000002';
const inputsData1 = '00000000000000000000000000000000000000000000000000000000005ec34b';
const inputsData2 = '0000000000000000000000000000000000000000000000000000018216c01b21';

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
