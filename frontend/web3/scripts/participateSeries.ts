import { ethers } from 'hardhat';
const contractAddress = process.env.ERC1155;
const account = process.env.TEST_PUBLIC_KEY;
const admin = process.env.PUBLIC_KEY;

async function participateSeries(
    contractAddress: string,
    account: string,
    admin: string,
    seriesId: number,
    amount: number
) {
    const Erc1155 = await ethers.getContractFactory('MyERC1155');
    const erc1155 = await Erc1155.attach(contractAddress);

    // 가스 추정
    const estimatedGassetURI = await erc1155.estimateGas.setURI(seriesId, 'https://ip');
    const estimatedGasmint = await erc1155.estimateGas.mint(admin, seriesId, amount, '0x');

    // 가스를 추정하기 힘들 경우, unpredictable_gas_limit 에러가 발생할 수 있음.
    const estimatedGas = await erc1155.estimateGas.safeTransferFrom(admin, account, seriesId, amount, '0x');

    const participate = await erc1155.safeTransferFrom(admin, account, seriesId, amount, '0x', {
        gasLimit: estimatedGas,
    });

    console.log('participate :', participate);
}

async function checkParticipated(contractAddress: string, account: string, seriesId: number) {
    const Erc1155 = await ethers.getContractFactory('MyERC1155');
    const erc1155 = await Erc1155.attach(contractAddress);
    const checkParticipated = await erc1155.balanceOf(account, seriesId);
    console.log('checkParticipated :', checkParticipated.toNumber());
}

participateSeries(contractAddress!, account!, admin!, 1, 1).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

checkParticipated(contractAddress!, account!, 1).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
