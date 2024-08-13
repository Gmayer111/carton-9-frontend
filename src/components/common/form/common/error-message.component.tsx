import { TFieldItem } from "../form";

const ErrorMessage = ({ errorMessage }: Pick<TFieldItem, "errorMessage">) => {
  if (!errorMessage) return null;

  return (
    <div className="error-message-container">
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
