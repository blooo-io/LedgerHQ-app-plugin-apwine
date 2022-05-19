import { processTest, populateTransaction } from './test.fixture';

const contractName = 'AdminUpgradeabilityProxy';

const testLabel = 'removeLiquidity'; // <= Name of the test
const testDirSuffix = 'remove_liquidity'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;

const contractAddr = '0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba';

// // From : https://etherscan.io/tx/0x54db6374f46f3a1c5897f27e913725250ea0befaa6299a975f5825d3e5d39842
const inputData = '0xafc3083c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000001f3398d2356deaa150000000000000000000000000000000000000000000001ae9ebc3ff118256500000000000000000000000000000000000000000000000f927ba5edf51da598a2';
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
