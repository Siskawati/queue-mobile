import { ReactElement } from "react";

export interface MenuListProps {
  text: string;
  element: ReactElement;
  onClick: () => void;
}
