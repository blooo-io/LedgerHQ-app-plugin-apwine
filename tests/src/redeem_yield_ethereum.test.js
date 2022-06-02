import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'redeemYield'; // <= Name of the test
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;

const transactions = [
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x04e5cc506aabe6434603d73d4f796e934ca05ade',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x6afc7a02263ae867c09c87b850c21494a546b4f1',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0xb2ed3e50b2811667e4e40951592df8cb1f6d4fca',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0xbf0e70f0435d0418de3b6209920e434af5e6ff78',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0xd0d71d6650dabe0b5afaba97dd980727574c2812',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x1138877f7ae0c43ec98ce56c8e5fb74fae8486e1',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0xb6710a940908503e24166a4ab5bf7cf391fa153f',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x7c3385a43ef207ea635fb8aa49be99e6aba6f8b6',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0xcbd1de3b69f80a407c0423226716bfea6aaaa7d7',
    },
    {
        inputData: '0x258d3c330000000000000000000000000000000000000000000000000000000000000001',
        contractAddr: '0x0adb804fe292af95c05e3c03e6ea372116b37d69',
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

    const testDirSuffix = `${testLabel}_${tx.contractAddr}`; // <= directory to compare device snapshots to
    const serializedTx = populateTransaction(tx.contractAddr, tx.inputData, chainID);
    devices.forEach((device) => processTest(device, contractName, `${testLabel}_${tx.contractAddr}`, testDirSuffix, '', signedPlugin, serializedTx, testNetwork));
});
