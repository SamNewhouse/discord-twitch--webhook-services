import { ButtonHTMLAttributes, FC, ReactNode, memo } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const LiveButton: FC<Props> = ({
  children,
  onClick,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type as "button" | "submit" | "reset"}
      className={`bg-green-500 text-white p-3 rounded-md cursor-pointer hover:bg-green-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default memo(LiveButton);
