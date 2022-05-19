import { processTest, populateTransaction } from './test.fixture';

const contractName = 'AdminUpgradeabilityProxy';

const testLabel = 'removeLiquidity'; // <= Name of the test
const testDirSuffix = 'remove_liquidity'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;

const contractAddr = '0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba';

// // From : https://polygonscan.com/tx/0xb64541c90f8ab1921f0cbd326d18f6fdce41be2b629806196ea854f00c331df7
const inputData = '0xafc3083c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000003d54744685f3b2fdf000000000000000000000000000000000000000000000000000000000407870600000000000000000000000000000000000000000000000000000000de063b10';
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 10, // <= Define the number of steps for this test case and this device
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
