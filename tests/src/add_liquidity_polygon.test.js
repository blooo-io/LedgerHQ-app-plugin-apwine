import { processTest, populateTransaction } from './test.fixture';

const contractName = 'AdminUpgradeabilityProxy';

const testLabel = 'addLiquidity'; // <= Name of the test
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;

const transactions = [
    {
        // From : https://polygonscan.com/tx/0x7003b7d255fd368b2f7113c07fea2b36dc8f2a5d35469e7fb99a9d9db3fdd63e
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003461efb7d342fb0a800000000000000000000000000000000000000000000000000000001b4b61a2d000000000000000000000000000000000000000000000000000000011bb7d600',
        contractAddr: '0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba',
        nanoStep: 9,
        nanoSPtep: 8,
        nanoXtep: 8,
    },
    {
        // From : https://polygonscan.com/tx/0x07c7f969d556c3d7af419b235c4df6829e64ab72d63bcae1872381cbed75a08c
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000030ee39936f0fa37d05000000000000000000000000000000000000000000000006e257fa49c2392b4d00000000000000000000000000000000000000000000015e4a259b63657d6330',
        contractAddr: '0x91e94e5e3baa054f92bac48a9c05e6228de1fcac',
        nanoStep: 10,
        nanoSPtep: 8,
        nanoXtep: 8,
    },
    {
        // From : https://polygonscan.com/tx/0x1058a9a89e84067b981910abd9d3c7416870bbc337b72a346f22ced9b2e22c20
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000023c6d47364ef8819e1470000000000000000000000000000000000000000000024ba4b1e7567bd1ca748000000000000000000000000000000000000000000002132374a144dc9341496',
        contractAddr: '0x7429e160aa4ab7bbec65c101bd2624c8cba8a2f6',
        nanoStep: 10,
        nanoSPtep: 8,
        nanoXtep: 8,
    },
    {
        // From : https://polygonscan.com/tx/0x11aa743882e5150ca09c8c1beb1ed98f2c8d6829ef01f4d3b23b8243b625ef5f
        inputData: '0x2d8918d7000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000002a6ec7305b684caa22000000000000000000000000000000000000000000000000016b6956b828294600000000000000000000000000000000000000000000000054bff1a8c8a74eae',
        contractAddr: '0xc68b6987075944f9e8b0a6c2b52e923bc1fb9028',
        nanoStep: 10,
        nanoSPtep: 8,
        nanoXtep: 8,
    },
    {
        // From : https://polygonscan.com/tx/0x1d8f6cae360630e91dfb336843d09c1fe768dc68d478bdd98ad14d419bae7145
        inputData: '0x2d8918d7000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000006b014038512af68000000000000000000000000000000000000000000000000005159c4b9fe86a600000000000000000000000000000000000000000000000005fafc3b390f3e3b',
        contractAddr: '0x1604c5e9ab488d66e983644355511dcef5c32edf',
        nanoStep: 10,
        nanoSPtep: 8,
        nanoXtep: 8,
    },
    {
        // From : https://polygonscan.com/tx/0x10c6155f64a49f715d61960edba89eef30527f1eb30499f2fe4de97559b373b1
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000292094e040ab3a2400000000000000000000000000000000000000000000000000014555119e345600000000000000000000000000000000000000000000000000013ca5cdb7aa04',
        contractAddr: '0x4bf982f43994033e8c4e2c36d00c776b550e76c3',
        nanoStep: 10,
        nanoSPtep: 8,
        nanoXtep: 8,
    },
    {
        // From : https://polygonscan.com/tx/0x20b2412a7eb0220e53f0f7c19af0cdffb4e5943ab9d9c2c9520242761e2c4643
        inputData: '0x2d8918d7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e6039093b60c1e6ef0000000000000000000000000000000000000000000000000011f34dfa0b51900000000000000000000000000000000000000000000000000011ba5a5cd071d3',
        contractAddr: '0x2df9cf57ac79a76a2e8d944b623a9f324af85ab8',
        nanoStep: 10,
        nanoSPtep: 8,
        nanoXtep: 8,
    },
];

transactions.forEach((tx) => {
    const devices = [
        {
            name: 'nanos',
            label: 'Nano S',
            steps: tx.nanoStep, // <= Define the number of steps for this test case and this device
        },
        {
            name: 'nanox',
            label: 'Nano X',
            steps: tx.nanoSPtep, // <= Define the number of steps for this test case and this device
        },
        {
            name: 'nanosp',
            label: 'Nano S+',
            steps: tx.nanoXtep, // <= Define the number of steps for this test case and this device
        },
    ];

    const testDirSuffix = `${testLabel}_${tx.contractAddr}`; // <= directory to compare device snapshots to
    const serializedTx = populateTransaction(tx.contractAddr, tx.inputData, chainID);
    devices.forEach((device) => processTest(device, contractName, `${testLabel}_${tx.contractAddr}`, testDirSuffix, '', signedPlugin, serializedTx, testNetwork));
});
