import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Grid from "../components/layouts/Grid";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import GroupProvider from "../context/GroupContextProvider";

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
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <ChakraProvider>
          <GroupProvider>
            <Grid>
              <Component {...pageProps} />
            </Grid>
          </GroupProvider>
        </ChakraProvider>
      </MantineProvider>
    </>
  );
}
