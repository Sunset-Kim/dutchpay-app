import { Grid } from "@mantine/core";
import { PropsWithChildren } from "react";
import Container from "./Container";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Container py={40}>
        <Grid justify="flex-start" gutter={10} gutterMd={20}>
          {children}
        </Grid>
      </Container>
    </>
  );
}
