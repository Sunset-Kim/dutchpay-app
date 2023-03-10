import { useToastContainer } from "../../../hooks/useToastContainer";

export default function ToastContainer() {
  const { renderToast } = useToastContainer();

  return (
    <div
      style={{
        position: "fixed",
        right: "1rem",
        bottom: "1rem",
        zIndex: 9999,
      }}
    >
      {renderToast()}
    </div>
  );
}
