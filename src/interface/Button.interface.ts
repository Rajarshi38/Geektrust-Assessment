export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
}
