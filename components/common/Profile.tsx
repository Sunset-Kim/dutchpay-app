import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth/authContext";

export default function Profile() {
  const { authUser, signOut } = useAuth();
  const { push } = useRouter();

  if (authUser === null) {
    return null;
  }

  return (
    <Menu position="bottom-end" shadow="md" width={180} withArrow>
      <Menu.Target>
        <UnstyledButton>
          <Avatar radius={"xl"} src={authUser.photoURL} alt={"user"} color="blue" />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>서비스</Menu.Label>
        <Menu.Item onClick={() => push("/group/create")}>그룹생성</Menu.Item>
        <Menu.Item onClick={() => push("/group")}>그룹페이지</Menu.Item>

        <Menu.Divider />
        <Menu.Label>계정</Menu.Label>
        <Menu.Item icon={<IconLogout size={14} />} color="red" onClick={signOut}>
          로그아웃
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
