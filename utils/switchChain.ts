import { ethers } from "ethers";

export const switchNetwork = async (targetNetwork: number) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const network = await provider.getNetwork();

    if (network.chainId !== targetNetwork) {
        return await provider.send("wallet_switchEthereumChain", [{ chainId: `0x${targetNetwork.toString(16)}` }]);
    }
}