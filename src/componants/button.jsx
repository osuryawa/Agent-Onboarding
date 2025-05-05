const Button = ({ text, onClick, type = 'button', className = '' }) => (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 text-white py-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg ${className}`}
    >
      {text}
    </button>
  );
  
  export default Button;
  