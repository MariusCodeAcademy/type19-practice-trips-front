type ButtonProps = {
  secondary?: boolean;
  info?: boolean;
  outline?: boolean;
  children: string;
};

export default function Button({ children, info, outline, secondary }: ButtonProps) {
  return <button className={'btn btn-primary'}>{children}</button>;
}
