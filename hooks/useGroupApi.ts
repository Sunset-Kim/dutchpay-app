import { useContext } from "react";
import { GroupControlAPIContext } from "../context/group/GroupContext";
const useGroupApi = () => {
  const context = useContext(GroupControlAPIContext);

  if (!context) {
    throw Error("Wrapping Group Context Provider");
  }
  return {
    ...context,
  };
};

export default useGroupApi;
