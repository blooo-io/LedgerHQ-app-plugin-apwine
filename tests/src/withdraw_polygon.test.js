import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'withdraw'; // <= Name of the test
const testDirSuffix = 'withdraw'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;

const contractAddr = '0x4ba30fa240047c17fc557b8628799068d4396790';

// // From : https://polygonscan.com/tx/0xe8d8f425a68c0dc1b144f828eb9f949ee9bddbde50bcf78c8e1fccc5267e5377
const inputData = '0xf3fef3a30000000000000000000000004d176feb1fe8a49d52799397f0b161fb15b23a5000000000000000000000000000000000000000000000012064f4804734bda1bd';
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
