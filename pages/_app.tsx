import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import ToastContainer from "../components/common/toast/ToastContainer";
import Layout from "../components/layouts/Layout";
import { AuthProvider } from "../context/auth/authContext";
import GroupProvider from "../context/group/GroupContextProvider";

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
        <AuthProvider>
          <GroupProvider>
            <ToastContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GroupProvider>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}
