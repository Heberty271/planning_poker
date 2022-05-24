import { ReactNode } from "react";
import { TopBar } from "../TopBar";
import { Body } from "./Body";

type BodyProps = {
  children?: ReactNode;
  className?: string;
}

export function Page({ children, className }: BodyProps) {
  return (
    <>
      <div className={'h-full flex-col-center '+className}>
        <TopBar />
        <Body>{children}</Body>
      </div>
    </>
  )
}