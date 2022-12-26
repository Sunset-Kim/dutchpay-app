import { Button, createStyles, Grid, Group, List, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  inner: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  content: {
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <Grid.Col span={12}>
      <div className={classes.inner}>
        <Stack spacing={"xl"}>
          <Title order={1} size={"h2"} weight="700">
            자주보는 모임의 시작,
            <span className={classes.highlight}>더치페이</span>
          </Title>

          <List
            spacing="sm"
            size="md"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>결제는 그때그때 편한사람이 하세요</b>
              <Text size="sm">누가 결제하든 상관없어요. 정산은 나중에 공평하게 해요.</Text>
            </List.Item>
            <List.Item>
              <b>최적의 송금방법을 계산해요</b>
              <Text size="sm">복잡하게 누구에게 줘야할지 고민하지 마세요.</Text>
            </List.Item>
            <List.Item>
              <b>정산내역은 이미지를 저장하고 공유해요</b>
              <Text size="sm">정산내역을 입력하고 이미지로 내려받아 관리하세요</Text>
            </List.Item>
          </List>

          <Group
            sx={{
              justifySelf: "flex-end",
            }}
          >
            <Button href={"group"} component={Link} variant="default">
              기존사용자
            </Button>
            <Button href={"group/create"} component={Link} variant="default">
              신규사용자
            </Button>
          </Group>
        </Stack>
        <Stack spacing={0}>
          <Image src={"/images/amico.png"} width={320} height={320} alt="each payment" />
          <Text size={"xs"} color="blue.4" align="left">
            <a href="https://storyset.com/marketing">Marketing illustrations by Storyset</a>
          </Text>
        </Stack>
      </div>
    </Grid.Col>
  );
}
