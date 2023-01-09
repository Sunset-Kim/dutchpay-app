import { Button, Group, Header as MantineHeader, LoadingOverlay, Text } from "@mantine/core";
import Link from "next/link";
import { useAuth } from "../../context/auth/authContext";
import Profile from "../common/Profile";
import Container from "./Container";

export default function Header() {
  const { authUser, signInWithGoogle, loading } = useAuth();

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
            <Profile />
            {authUser === null && <Button onClick={() => signInWithGoogle()}>Google 로그인</Button>}
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
}
