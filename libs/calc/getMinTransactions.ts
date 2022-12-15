import { ExpenseSegment } from "../../types/ExpenseSummary.type";

interface Transaction {
  sender: string;
  receiver: string;
  amount: number;
}

export function getMinTransaction(list: Pick<ExpenseSegment, "payer" | "price">[]) {
  const total = list.reduce((total, segment) => (total += segment.price), 0);
  const perAmount = total / list.length;

  const calcedList = list
    .map((segment) => {
      const { payer, price } = segment;
      return {
        payer,
        diff: price - perAmount,
      };
    })
    .sort((a, b) => a.diff - b.diff);

  const tarnsactionList: Transaction[] = [];

  let left = 0;
  let right = calcedList.length - 1;

  while (left < right) {
    if (calcedList[left].diff === 0) {
      left++;
    } else if (calcedList[right].diff === 0) {
      right--;
    } else {
      const sender = calcedList[left];
      const receiver = calcedList[right];
      const senderAmount = Math.abs(sender.diff);
      const receiverAmount = Math.abs(receiver.diff);

      if (senderAmount > receiverAmount) {
        tarnsactionList.push({
          receiver: receiver.payer,
          sender: sender.payer,
          amount: receiverAmount,
        });

        sender.diff -= receiverAmount;
        receiver.diff = 0;

        right--;
      } else {
        tarnsactionList.push({
          receiver: receiver.payer,
          sender: sender.payer,
          amount: senderAmount,
        });
        receiver.diff -= senderAmount;
        sender.diff = 0;

        left++;
      }
    }
  }

  return tarnsactionList;
}
