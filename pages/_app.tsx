import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layouts/Layout";
import GroupProvider from "../context/GroupContextProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <GroupProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GroupProvider>
      </MantineProvider>
    </>
  );
}
