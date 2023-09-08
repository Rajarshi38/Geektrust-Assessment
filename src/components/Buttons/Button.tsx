import { IButtonProps } from "../../interface/Button.interface";

export const PrimaryButton = ({
  children,
  type,
  tabIndex,
  className,
  ...rest
}: IButtonProps) => {
  return (
    <button
      tabIndex={tabIndex}
      type={type}
      className={`bg-[#f0666b] text-white px-4 py-2 font-bold rounded-sm hover:bg-[#f4464c] transition duration-200 ease-in${
        className ? " " + className : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  children,
  type,
  tabIndex,
  className,
  ...rest
}: IButtonProps) => {
  return (
    <button
      tabIndex={tabIndex}
      type={type}
      className={`border-2 border-solid border-[#f0666b] outline-transparent text-white px-4 py-2 font-bold rounded-sm   hover:border-[#f4464c] transition-all duration-150 ease-in${
        className ? " " + className : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
