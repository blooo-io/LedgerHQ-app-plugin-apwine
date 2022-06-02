import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'redeemYield'; // <= Name of the test
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;

const transactions = [
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x67952e78f2d3d2c38c190c56ebcbc116b70010e6',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x1421cf43731e0e6eb7c5c04d2f715515eca4dabf',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x982375f00f286d14cbe8633a58f0bab710be1449',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x668cdd65aeb2eb4cda2997bd0f86397f7bfc33f1',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x08a8a1bd52fca31d047484b40a7026c8f064066e',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0xb9af29f981b4a69de421f5d8da46c2c7c473c67c',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x33b22e2cc0af29befdcfdd0abfb9b1dae23b4141',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x5b7db209194414450be045ea34f25f45f1847bbf',
    },
];

transactions.forEach((tx) => {
    const devices = [
        {
            name: 'nanos',
            label: 'Nano S',
            steps: 5, // <= Define the number of steps for this test case and this device
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

    const testDirSuffix = `${testLabel}_${tx.contractAddr}`; // <= directory to compare device snapshots to
    const serializedTx = populateTransaction(tx.contractAddr, tx.inputData, chainID, '100');
    devices.forEach((device) => processTest(device, contractName, `${testLabel}_${tx.contractAddr}`, testDirSuffix, '', signedPlugin, serializedTx, testNetwork));
});
