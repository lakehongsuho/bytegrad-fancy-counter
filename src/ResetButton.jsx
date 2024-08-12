import { ResetIcon } from "@radix-ui/react-icons";

export default function ResetButton({ setCount }) {
  const handleClick = (e) => {
    setCount(0);
    e.currentTarget.blur();
  };

  return (
    <button onClick={handleClick} className="reset-btn">
      <ResetIcon className="reset-btn-icon" />
    </button>
  );
}
