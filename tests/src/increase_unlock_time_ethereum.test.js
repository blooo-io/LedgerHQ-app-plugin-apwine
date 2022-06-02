import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'increaseUnlockTime'; // <= Name of the test
const testDirSuffix = 'increase_unlock_time'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;
const contractAddr = '0xc5ca1ebf6e912e49a6a70bb0385ea065061a4f09';

// FROM : https://etherscan.io/tx/0x0e02e85055eb375bc049ccc307425406300919f61e1532fc3338a3d8f04c2b6b
const inputData = '0xeff7a61200000000000000000000000000000000000000000000000000000000637eb400';

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 4, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanox',
        label: 'Nano X',
        steps: 4, // <= Define the number of steps for this test case and this device
    },
    {
        name: 'nanosp',
        label: 'Nano S+',
        steps: 4, // <= Define the number of steps for this test case and this device
    },
];

devices.forEach((device) => {
    processTest(device, contractName, testLabel, testDirSuffix, '', signedPlugin, serializedTx, testNetwork);
});
