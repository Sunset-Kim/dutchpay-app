import toast from "../libs/toast";

const Toast = () => {
  return (
    <div>
      toast
      <button onClick={() => toast.success("메세지")}>눌러보기</button>
      <button onClick={() => toast.error("메세지")}>눌러보기</button>
    </div>
  );
};

export default Toast;
