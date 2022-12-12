import { Container, Grid as GridContainer } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Grid({ children }: PropsWithChildren) {
  return (
    <Container centerContent maxW={["340px", "768px", "1200px"]}>
      <GridContainer
        w="full"
        minH="100vh"
        templateColumns={["repeat(6, 1fr)", "repeat(6, 1fr)", "repeat(12, 1fr)"]}
        gap={[4, 5, "20px"]}
      >
        {children}
      </GridContainer>
    </Container>
  );
}
