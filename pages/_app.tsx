import { MantineProvider } from "@mantine/core";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layouts/Layout";
import appConfig from "../config";
import GroupProvider from "../context/group/GroupContextProvider";

import "../styles/globals.css";

const { url, title, description } = appConfig.seo;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url,
          siteName: title,
        }}
      />
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
