import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'deposit'; // <= Name of the test
const testDirSuffix = 'deposit'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;

const contractAddr = '0x4ba30fa240047c17fc557b8628799068d4396790';

// // From : https://polygonscan.com/tx/0x872d7fcd41267ba643cae0a2552aa1d2e0899b58694e2e966239185ef1698171
const inputData = '0x47e7ef240000000000000000000000004d176feb1fe8a49d52799397f0b161fb15b23a5000000000000000000000000000000000000000000000000cf2d50c427d12757b';
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
