import {
  Box,
  createStyles,
  Divider,
  Group,
  MantineColor,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";

import { IconArrowUpRight, IconCash } from "@tabler/icons";
import { ExpenseSegment, ProgressSection } from "../types/ExpenseSummary.type";

import { formatKRWCurrency } from "../libs/formater";

interface ExpenseChartProps {
  data: ExpenseSegment[];
  total: number;
}

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  segment: {
    borderBottom: "3px solid",
    paddingBottom: 5,
  },

  segmentCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
  },
}));

export default function ExpenseChart({ data, total }: ExpenseChartProps) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const perPrice = total / data.length;
  const secitons: ProgressSection[] = data.map((item, i) => {
    const { payer, part } = item;
    return { value: part, label: payer, color: COLORS[i % COLORS.length] };
  });

  const { classes } = useStyles();

  const descriptions = data.map((segment, i) => (
    <Box key={segment.payer} className={classes.segment}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {segment.payer}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{formatKRWCurrency(segment.price)}</Text>
        <Text weight={700} size="sm" className={classes.segmentCount}>
          {segment.part.toFixed(2)}%
        </Text>
        <Divider color={COLORS[i % COLORS.length]} />
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart" py="sm">
        <Group align="center" spacing="xs">
          <ThemeIcon size={"sm"}>
            <IconCash />
          </ThemeIcon>
          <Text size="xl" weight={700}>
            최종정산금액
          </Text>
        </Group>

        <Text size="xl" weight={700}>
          {total ? formatKRWCurrency(total) : "-"}
        </Text>
      </Group>

      <Divider />

      <Box py="xs">
        {data.length !== 0 && (
          <Text size="sm">{`이번에 1인당 결제하실 금액은 ${formatKRWCurrency(perPrice)} 입니다.`}</Text>
        )}

        <Stack spacing={0} mt="md">
          <Progress sections={secitons} size={50} mb="sm" classNames={{ label: classes.progressLabel }} />
          <SimpleGrid mb="sm" cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
            {descriptions}
          </SimpleGrid>
          <Text color="dimmed" size="xs">
            * 위의 차트는 최종정산 금액에서 가장 많이 결제한 사람의 비용을 보여줍니다
          </Text>
        </Stack>
      </Box>
    </Paper>
  );
}
