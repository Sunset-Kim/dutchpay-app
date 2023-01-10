import { Box, createStyles, Divider, Group, Paper, Progress, SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";

import { IconCash } from "@tabler/icons";

import { ExpenseInfo } from "@/types/Expense.type";
import { formatKRWCurrency, toPercent } from "../../libs/formater";

interface ExpenseChartProps {
  expenseList: ExpenseInfo[];
  totalPrice: number;
  perPrice: number;
}

const useStyles = createStyles((theme) => ({
  progressLabel: {
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  segment: {
    paddingBottom: 5,
  },

  segmentCount: {
    lineHeight: 1.3,
  },

  diff: {
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
  },
}));

const COLORS = [
  "grape.4",
  "orange.4",
  "blue.4",
  "lime.4",
  "red.4",
  "teal.4",
  "indigo.4",
  "pink.4",
  "yellow.4",
  "cyan.4",
  "green.4",
  "violet.4",
];

export default function ExpenseChart({ totalPrice, perPrice, expenseList }: ExpenseChartProps) {
  const { classes } = useStyles();

  const descriptions = expenseList.map((expense, i) => (
    <Box key={expense.payer} className={classes.segment}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {expense.payer}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{formatKRWCurrency(expense.price)}</Text>
        <Text weight={700} size="sm" className={classes.segmentCount}>
          {toPercent(expense.price, totalPrice).toFixed(2)}%
        </Text>
      </Group>

      <Divider color={COLORS[i % COLORS.length]} sx={{ borderWidth: "4px", borderRadius: "999px" }} />
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
            총 소비금액
          </Text>
        </Group>

        <Text size="xl" weight={700}>
          {totalPrice ? formatKRWCurrency(totalPrice) : "-"}
        </Text>
      </Group>

      <Divider />

      <Box py="xs">
        {perPrice !== 0 && (
          <Text size="sm">{`이번에 1인당 결제하실 금액은 ${formatKRWCurrency(perPrice)} 입니다.`}</Text>
        )}

        <Stack spacing={0} mt="md">
          <Progress
            sections={expenseList.map((expense, i) => ({
              value: (expense.price / totalPrice) * 100,
              color: COLORS[i % COLORS.length],
              label: expense.payer,
            }))}
            size={50}
            mb="sm"
            classNames={{ label: classes.progressLabel }}
          />
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
