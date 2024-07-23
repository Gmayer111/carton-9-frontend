export type TErrorMessage = {
  errorMessage?: string;
};

const ErrorMessage = ({ errorMessage }: TErrorMessage) => {
  if (!errorMessage) return null;

  return (
    <div className="error-message-container">
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
