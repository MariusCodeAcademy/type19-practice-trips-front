import cl from 'classnames';

type ButtonProps = {
  secondary?: boolean;
  info?: boolean;
  outline?: boolean;
  children: string;
};

export default function Button({ children, info, outline, secondary }: ButtonProps) {
  // be classnames
  const finalClass = secondary ? 'secondary' : outline ? 'outline-primary' : 'primary';
  let finalSwithClass = '';
  switch (true) {
    case secondary:
      finalSwithClass = 'secondary';
      break;
    case outline:
      finalSwithClass = 'outline-primary';
      break;
    case info:
      finalSwithClass = 'info';
      break;
    default:
      finalSwithClass = 'primary';
  }
  const classNamesClass = cl({
    secondary: secondary,
    info: info,
    'outline-primary': outline,
    primary: !secondary && !info && !outline,
  });
  // su classnames
  return <button className={`btn btn-${classNamesClass}`}>{children}</button>;
}
