import { useContext } from "react";
import { GroupContext, GroupControlAPIContext } from "../context/group/GroupContext";

const useGroup = () => {
  const context = useContext(GroupContext);
  const contextController = useContext(GroupControlAPIContext);

  if (!context) {
    throw Error("wrapping provider");
  }

  return {
    ...context,
    ...contextController,
  };
};

export default useGroup;
