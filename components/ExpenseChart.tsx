import { Box, createStyles, Group, MantineColor, Paper, Progress, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import { EXPENSE_INFO_LIST } from "../fixture/expense";
import { IconArrowUpRight, IconCash } from "@tabler/icons";
import { ExpenseSegment, ProgressSection } from "../types/ExpenseSummary.type";
import { ExpenseInfo } from "../types/Expense.type";
import { convertExpenseListToMap } from "../libs/converter/convertExpenseListToMap";
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

  const secitons: ProgressSection[] = data.map((item, i) => {
    const { payer, part } = item;
    return { value: part, label: payer, color: COLORS[i % COLORS.length] };
  });

  const { classes } = useStyles();

  const descriptions = data.map((segment) => (
    <Box key={segment.payer} className={classes.segment}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {segment.payer}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{segment.price}</Text>
        <Text weight={700} size="sm" className={classes.segmentCount}>
          {segment.part.toFixed(2)}%
        </Text>
      </Group>
    </Box>
  ));
  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
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

      <Text color="dimmed" size="sm">
        최종정산 금액에서 가장 많이 결제한 사람의 비용을 보여줍니다
      </Text>

      <Progress sections={secitons} size={34} classNames={{ label: classes.progressLabel }} mt={40} />
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}
