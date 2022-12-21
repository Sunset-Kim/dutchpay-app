import { Button, Group, Header as MantineHeader, Text } from "@mantine/core";
import Link from "next/link";
import Container from "./Container";

export default function Header() {
  return (
    <MantineHeader height={56}>
      <Container>
        <Group h="100%" position="apart" align={"center"}>
          <Text size={"lg"} weight={800}>
            우리자주만나요
          </Text>
          <Group>
            <Button variant="outline">
              <Link href={"/"}>그룹생성하고 시작하기</Link>
            </Button>
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
}
