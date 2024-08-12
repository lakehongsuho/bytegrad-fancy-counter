import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function CountButton({ type, setCount, locked }) {
  const handleClick = (e) => {
    setCount((prev) => {
      if (type === "plus") {
        const newCount = prev + 1;
        if (newCount > 5) {
          return 5;
        }
        return newCount;
      } else if (type === "minus") {
        const newCount = prev - 1;
        if (newCount < 0) {
          return 0;
        }
        return newCount;
      } else {
        console.log("something went wrong");
        return prev;
      }
    });
    e.currentTarget.blur();
  };
  return (
    <button disabled={locked} onClick={handleClick} className="count-btn">
      {type === "plus" && <PlusIcon className="count-btn-icon" />}
      {type === "minus" && <MinusIcon className="count-btn-icon" />}
    </button>
  );
}
