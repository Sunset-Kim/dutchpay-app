import { ExpenseInfo } from "@/types/Expense.type";

export interface Transaction {
  sender: string;
  receiver: string;
  amount: number;
}

export interface TransactionProps {
  expenses: Pick<ExpenseInfo, "payer" | "price">[];
  members: string[];
  totalPrice: number;
}

export function getMinTransaction(props: TransactionProps) {
  const { expenses, members, totalPrice } = props;
  const tarnsactionList: Transaction[] = [];
  if (totalPrice === 0) return [];

  const perAmount = totalPrice / members.length;
  const memberToPay = new Map();

  members.forEach((member) => {
    memberToPay.set(member, perAmount);
  });

  expenses.forEach((segment) => {
    const { payer, price } = segment;
    if (memberToPay.has(payer)) {
      memberToPay.set(payer, memberToPay.get(payer) - price);
    }
  });

  const payList = [...memberToPay.entries()]
    .map(([key, value]) => ({
      payer: key,
      diff: value,
    }))
    .sort((a, b) => a.diff - b.diff);

  let left = 0;
  let right = payList.length - 1;

  while (left < right) {
    if (payList[left].diff === 0) {
      left++;
    } else if (payList[right].diff === 0) {
      right--;
    } else {
      const receiver = payList[left];
      const sender = payList[right];
      const receiverAmount = Math.abs(receiver.diff);
      const senderAmount = Math.abs(sender.diff);

      if (receiverAmount > senderAmount) {
        tarnsactionList.push({
          receiver: receiver.payer,
          sender: sender.payer,
          amount: senderAmount,
        });

        sender.diff = 0;
        receiver.diff -= sender.diff;

        right--;
      } else {
        tarnsactionList.push({
          receiver: receiver.payer,
          sender: sender.payer,
          amount: receiverAmount,
        });
        receiver.diff = 0;
        sender.diff -= receiverAmount;

        left++;
      }
    }
  }

  return tarnsactionList;
}
