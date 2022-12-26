import { Button, Group, Header as MantineHeader, Text } from "@mantine/core";
import Link from "next/link";
import Container from "./Container";

export default function Header() {
  return (
    <MantineHeader height={56}>
      <Container>
        <Group h="100%" position="apart" align={"center"}>
          <Link href={"/"}>
            <Text size={"lg"} weight={800}>
              우리자주만나요
            </Text>
          </Link>

          <Group>
            <Button href={"/group/create"} component={Link} variant="outline">
              그룹만들고 시작하기
            </Button>
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
}
