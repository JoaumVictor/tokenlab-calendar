interface BoxContentProps {
  children: React.ReactNode;
}

function BoxContent({ children }: BoxContentProps) {
  return <div className="max-w-6xl w-full mx-auto">{children}</div>;
}

export default BoxContent;
