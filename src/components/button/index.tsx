import { classNames } from "../../util/shared";

interface ButtonI {
  label: string | JSX.Element;
  type: "primary" | "secondary";
  typeButton?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({
  label,
  type,
  typeButton = "button",
  onClick,
  disabled,
  className,
}: ButtonI) {
  return (
    <button
      className={classNames(
        type === "primary"
          ? "bg-tertiary disabled:bg-disabled text-white hover:scale-105 transform transition-all"
          : "bg-transparent text-gray-400 hover:text-black",
        "rounded-[8px] px-6 py-3 font-semibold",
        className
      )}
      type={typeButton}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
