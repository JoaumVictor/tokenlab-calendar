import { classNames } from "@/util/shared";

interface BoxContentProps {
  children: React.ReactNode;
  className?: string;
}

function BoxContent({ children, className }: BoxContentProps) {
  return (
    <div className={classNames("max-w-6xl w-full mx-auto", className)}>
      {children}
    </div>
  );
}

export default BoxContent;
