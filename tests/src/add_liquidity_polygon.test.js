import { processTest, populateTransaction } from './test.fixture';

const contractName = 'AdminUpgradeabilityProxy';

const testLabel = 'addLiquidity'; // <= Name of the test
const testDirSuffix = 'add_liquidity'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;

const contractAddr = '0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba';

// // From : https://polygonscan.com/tx/0x7d40e4582a8b7dc991054d29901dd5e965c2d38e50d2cf43d518fde051c81bea
const inputData = '0x2d8918d7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001bfe0ca22fc50230000000000000000000000000000000000000000000000000000000000e8644f0000000000000000000000000000000000000000000000000000000000989680';
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
