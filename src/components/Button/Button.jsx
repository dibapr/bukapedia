const Button = ({ name, style, onClick, disabled }) => {
  return (
    <button
      className="btn btn-success gap-2 w-40 text-white"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
