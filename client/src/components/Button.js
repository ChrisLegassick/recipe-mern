const Button = ({ text, onClick, type, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      // className='bg-green-300'
      // {...otherProps}
      className={className}
    >
      {text}
    </button>
  );
};

export default Button;
