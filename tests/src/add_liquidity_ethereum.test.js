import { processTest, populateTransaction } from './test.fixture';

const contractName = 'AdminUpgradeabilityProxy';

const testLabel = 'addLiquidity'; // <= Name of the test
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;

const transactions = [
    {
        // From : https://etherscan.io/tx/0xa6e8648c27b2e7a4a5c5cc8231ac14b4a6b1940ae65154b7dd44bb298b1964fc
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007143b66765d699a90000000000000000000000000000000000000000000005692b748a9dd0e3d06e0000000000000000000000000000000000000000000004c89dfb9bb7c6f1e4a0',
        contractAddr: '0x8a362aa1c81ed0ee2ae677a8b59e0f563dd290ba',
    },
    {
        // From : https://etherscan.io/tx/0xb6b22cb37a0009f6b3fb1b6e018a928655b9d90ec5a2a6b3906eecd64bdc22a0
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000174bcf0ed2d45699d600000000000000000000000000000000000000000000007ce6cebad5a70bf4f8000000000000000000000000000000000000000000001202bf777973802edc33',
        contractAddr: '0x1a6525e4a4ab2e3aea7ed3cf813e8ed07fa3446d',
    },
    {
        // From : https://etherscan.io/tx/0x8f750a04cfb667b411d0b7d86b5fcf3fbd14b4a37f78ae38fd2643830327e2c7
        inputData: '0x2d8918d7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001d9f2f8851d09eff4d000000000000000000000000000000000000000000001f298617b2fc5b7c7863000000000000000000000000000000000000000000001e0596890573396fa149',
        contractAddr: '0xea851503ff416e34585d28c248918344c569b219',
    },
    {
        // From : https://etherscan.io/tx/0xc78777f5396705e80fa9aa56b287c9ee6603477d8b6e677b071321037ec302f4
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000003d38d99281a1a67d0000000000000000000000000000000000000000000000000059375a57ac1db8000000000000000000000000000000000000000000000000092aca66770384d9',
        contractAddr: '0x7259114df363de5d42fdf00b705fad7c85f8f795',
    },
    {
        // From : https://etherscan.io/tx/0xc8da0ef2347ac9ddc4b5e29b3cbd282a15282e7b4c2bf056bcd419ea48db66d8
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000185a4a5f4fad3280000000000000000000000000000000000000000000000001b0a04a70eea2d1300000000000000000000000000000000000000000000000016964d979b47c06b',
        contractAddr: '0x4df9bb881e5e61034001440aaaff2fb2932e2883',
    },
    {
        // From : https://etherscan.io/tx/0xc55b6f5a88668040f99fa8becaf3233042800a95b71c46edb6732c61cbd57442
        inputData: '0x2d8918d7000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000004177726a033c12ff190000000000000000000000000000000000000000000001e07ea861c8e10682f70000000000000000000000000000000000000000000002da22c16946f02d2ad0',
        contractAddr: '0x1089f7bbf8c680db92759a30d42ddfba7c794bd2',
    },
    {
        // From : https://etherscan.io/tx/0x70c07b7e6b53aebb2aad7481a30828fc9264f70f0d3ccd9922a0991ed125f488
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000b5c8d33895c62573bc000000000000000000000000000000000000000000000005741ad10ebbb452d50000000000000000000000000000000000000000000000b5c8d33895c62573cd',
        contractAddr: '0xbc35b70ccc8ef4ec1ccc34fab60ccbba162011e4',
    },
    {
        // From : https://etherscan.io/tx/0x88d9615d65051df593e950d30efca42bd3ba70f3f2028c797d70cfa9ae1fff36
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000443a8cfd7d0bd5ff12000000000000000000000000000000000000000000000004ad779fc4cb243924000000000000000000000000000000000000000000000039995f3365911c1484',
        contractAddr: '0xcba960001307a16ce8a9e326d73e92d53b446e81',
    },
    {
        // From : https://etherscan.io/tx/0x2bed82aaa5f68ce8d55aeddcf15670fb69de4616efba6d9362b243c23f5164ce
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000659ea254f14da515a318c6260d50000000000000000000000000000000000000000000003249bb62e57291ff88d00000000000000000000000000000000000000000000026ccf8208d1955853a9',
        contractAddr: '0x49cbbfedb15b5c22cac53daf104512a5de9c8457',
    },
    {
        // From : https://etherscan.io/tx/0x3c1cd2696284ab5c2897bb86ea4d9e854d2d01c4b4b711ba8c7a475842f4be11
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000067f5aecea084777000000000000000000000000000000000000000000000000000000007035064d000000000000000000000000000000000000000000000000000000006c67f7cb',
        contractAddr: '0xb932c4801240753604c768c991eb640bcd7c06eb',
    },
    {
        // From : https://etherscan.io/tx/0xcd75bf36a8f6e7a738ad3737715da956c7fe2f5518be43cc298f00e14020d1bd
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af053bdc2a78bebda4fe8524c2f367d000000000000000000000000000000000000000000001f0b74a8213fa28a9040000000000000000000000000000000000000000000001e933bf8988ba0e92233',
        contractAddr: '0x839bb033738510aa6b4f78af20f066bdc824b189',
    },
    {
        // From : https://etherscan.io/tx/0xc14baf15c6ecf4f008ec18678d010da71de6e82b7956e44cfce9377bf559f643
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000002421935307ba127ab00000000000000000000000000000000000000000000000000000000c5cd65a80000000000000000000000000000000000000000000000000000001aa5dfce43',
        contractAddr: '0x0cc36e3cc5eaca6d046b537703ae946874d57299',
    },
    {
        // From : https://etherscan.io/tx/0x6d1c6b952105ca5507c844ee5daef70ad4b748bbbca88983a4a87869926f59b6
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041bf9368af122515b2000000000000000000000000000000000000000000004eb318b05ddf6db924d60000000000000000000000000000000000000000000050fe7091cfab8162db08',
        contractAddr: '0xa4085c106c7a9a7ad0574865bbd7cac5e1098195',
    },
    {
        // From : https://etherscan.io/tx/0xb8f6ef98d458fec0413deefa940259e038673e1a691cd3a9fcc862382cba2777
        inputData: '0x2d8918d700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000021c598fe2def96a7a00000000000000000000000000000000000000000000000002fb0388bc3fee01000000000000000000000000000000000000000000000001118176f4d6d42a17',
        contractAddr: '0x1604c5e9ab488d66e983644355511dcef5c32edf',
    },
    {
        // From : https://etherscan.io/tx/0x96caf7a758a162148e15f016e68290e6ba2d1b11c85e2e9dfce810c6581e36e8
        inputData: '0x2d8918d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002f51da919425253320000000000000000000000000000000000000000000000032fe53ebaa422e727000000000000000000000000000000000000000000000002cb1c36d48741de61',
        contractAddr: '0xc61c0f4961f2093a083f47a4b783ad260deaf7ea',
    },
];

transactions.forEach((tx) => {
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

    const testDirSuffix = `${testLabel}_${tx.contractAddr}`; // <= directory to compare device snapshots to
    const serializedTx = populateTransaction(tx.contractAddr, tx.inputData, chainID);
    devices.forEach((device) => processTest(device, contractName, `${testLabel}_${tx.contractAddr}`, testDirSuffix, '', signedPlugin, serializedTx, testNetwork));
});
