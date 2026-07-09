const LoadingSpinner = ({ message }) => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      {message && <p className="spinner-container__message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
