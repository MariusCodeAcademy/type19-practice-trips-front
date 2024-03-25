type ButtonProps = {
  secondary?: boolean;
  info?: boolean;
  outline?: boolean;
  children: string;
};

export default function Button({ children, info, outline, secondary }: ButtonProps) {
  // be classnames
  const finalClass = '';
  // su classnames
  return <button className={`btn btn-primary`}>{children}</button>;
}
