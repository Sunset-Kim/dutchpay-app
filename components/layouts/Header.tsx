import { Button, Group, Header as MantineHeader, LoadingOverlay, Text } from "@mantine/core";
import Link from "next/link";
import { useAuth } from "../../context/auth/authContext";
import Container from "./Container";

export default function Header() {
  const { authUser, signInWithGoogle, signOut, loading } = useAuth();

  return (
    <MantineHeader height={56}>
      <LoadingOverlay visible={loading} />
      <Container>
        <Group h="100%" position="apart" align={"center"}>
          <Link href={"/"}>
            <Text size={"lg"} weight={800}>
              우리자주만나요
            </Text>
          </Link>

          <Group>
            <Button onClick={authUser ? () => signOut() : () => signInWithGoogle()}>
              {authUser ? "로그아웃" : "로그인"}
            </Button>
            <Button href={"/group/create"} component={Link} variant="outline">
              그룹만들고 시작하기
            </Button>
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
}
