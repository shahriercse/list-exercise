export function Button({ className, children, type = 'submit', ...props }) {
  return (
    <button
      type={type}
      className={
        'bg-dark focus:outline-none rounded-lg px-6 py-2 text-white mt-8 ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonOutline({
  className,
  children,
  type = 'submit',
  ...props
}) {
  return (
    <button
      type={type}
      className={
        'focus:outline-none rounded-lg px-12 py-2 text-white mt-8 ' + className
      }
      {...props}
    >
      {children}
    </button>
  );
}
