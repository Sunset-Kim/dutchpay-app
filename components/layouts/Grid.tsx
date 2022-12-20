import { Grid as GridContainer, Container } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function Grid({ children }: PropsWithChildren) {
  return (
    <Container size="lg" py="lg" px="lg">
      <GridContainer>{children}</GridContainer>
    </Container>
  );
}
