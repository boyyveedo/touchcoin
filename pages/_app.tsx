import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  bsc,
  mainnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '../styles/style.css'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    bsc
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Crypto Reward',
  projectId: '33cb148b22ee3127d20a432dac2fc41d',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors : connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
