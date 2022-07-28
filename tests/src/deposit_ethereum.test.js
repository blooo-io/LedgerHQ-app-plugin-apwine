import { processTest } from './test.fixture';

const contractName = 'TransparentUpgradeableProxy';

const testLabel = 'deposit'; // <= Name of the test
const testDirSuffix = 'deposit'; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = 'ethereum';
const chainID = 1;

const contractAddr = '0x4ba30fa240047c17fc557b8628799068d4396790';

// // From : https://etherscan.io/tx/0xa44a89f6aa87654c240595a19a8d40bed7e25bd20807e4a88aa69199cdcdab60
const rawTx = '0x02f8b1012b8459682f0085054f7160a68304c6d6944ba30fa240047c17fc557b8628799068d439679080b84447e7ef24000000000000000000000000894d7e0f2ecff866275a5a09ec6d44714fc74c3500000000000000000000000000000000000000000000000008f86346aa7d6fa8c080a0446d3d4f415d5e3cbce20dd194a816a7f19ceb8e6bff231ecef1f4c4ccd856fca051515135404af08c77e4e779d4902087325e0be8e18a72a869ef4641706fc334';

const devices = [
    {
        name: 'nanos',
        label: 'Nano S',
        steps: 8, // <= Define the number of steps for this test case and this device
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

devices.forEach((device) => {
    processTest(device, contractName, testLabel, testDirSuffix, rawTx, signedPlugin, '', testNetwork);
});
