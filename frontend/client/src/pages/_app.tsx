import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { mainnet } from 'wagmi/chains';

import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import 'flowbite';
import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import ToastProvider from '@/components/ToastProvider';


const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <WagmiConfig config={config}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastProvider/>
        </NextUIProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
