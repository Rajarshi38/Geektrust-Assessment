import { IButtonProps } from "../../interface/Button.interface";

const Button = ({ children, type, tabIndex, className }: IButtonProps) => {
  return (
    <button
      tabIndex={tabIndex}
      type={type}
      className={`bg-[#f0666b] text-white px-4 py-2 font-bold rounded-sm hover:bg-[#ee5d62] transition duration-200 ease-in${
        className ? " " + className : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
