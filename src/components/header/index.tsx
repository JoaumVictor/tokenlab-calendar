"use client";
import BasicHeader from "./basicHeader";
import DefaultHeader from "./defaultHeader";

interface IHeaderProps {
  headerType?: "basic" | "default";
}

export default function Header({ headerType = "basic" }: IHeaderProps) {
  const headerTypes = {
    basic: <BasicHeader />,
    default: <DefaultHeader />,
  };

  return headerTypes[headerType] || headerTypes["default"];
}
