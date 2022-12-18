import { GroupContext } from "./../context/GroupContext";
import { useContext } from "react";

const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw Error("wrapping provider");
  }
  return context;
};

export default useGroup;
