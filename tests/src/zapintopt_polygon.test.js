import { processTest, populateTransaction } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'zapInToPT'; // <= Name of the test
const testDirSuffix = 'zapintopt'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'polygon';
const chainID = 137;
const contractAddr = '0x6607377Bcd37Bb5681c02Ef77F514E38D52b7f5E';

const inputData = '0xff3bf06600000000000000000000000091e94e5e3baa054f92bac48a9c05e6228de1fcac0000000000000000000000000000000000000000000000087b65a6ccaff8ea040000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000088bb213c374d21d59000000000000000000000000000000000000000000000000000001812280fc52';
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
