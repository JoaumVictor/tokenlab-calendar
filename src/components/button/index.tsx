import { classNames } from "../../util/shared";

interface ButtonI {
  label: string;
  type: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({ label, type, onClick, disabled, className }: ButtonI) {
  return (
    <button
      className={classNames(
        type === "primary"
          ? "bg-tertiary disabled:bg-secondary text-white"
          : "bg-transparent text-gray-400 hover:text-black",
        "rounded-[8px] px-6 py-3 font-semibold",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
