import { processTest, populateTransaction } from './test.fixture';

const contractName = 'AdminUpgradeabilityProxy';

const testLabel = 'addLiquidity'; // <= Name of the test
const testDirSuffix = 'add_liquidity'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;

const contractAddr = '0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba';

// // From : https://etherscan.io/tx/0xa6e8648c27b2e7a4a5c5cc8231ac14b4a6b1940ae65154b7dd44bb298b1964fc
const inputData = '0x2d8918d700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007143b66765d699a90000000000000000000000000000000000000000000005692b748a9dd0e3d06e0000000000000000000000000000000000000000000004c89dfb9bb7c6f1e4a0';
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 9, // <= Define the number of steps for this test case and this device
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
