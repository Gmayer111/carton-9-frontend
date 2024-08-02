export type TErrorMessage = {
  errorMessage?: string;
};

const ErrorMessage = ({ errorMessage }: TErrorMessage) => {
  console.log(errorMessage);

  if (!errorMessage) return null;

  return (
    <div className="error-message-container">
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
