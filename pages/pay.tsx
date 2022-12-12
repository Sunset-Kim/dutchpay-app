import { GridItem } from "@chakra-ui/react";
import AddExpenseForm from "../components/AddExpenseForm";

export default function Pay() {
  return (
    <GridItem colSpan={12}>
      <AddExpenseForm
        members={["김영식"]}
        onSubmit={(...args) => {
          console.log(args);
        }}
      />
    </GridItem>
  );
}
