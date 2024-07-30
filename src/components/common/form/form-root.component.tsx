import React from "react";
import Button from "./form-fields/button/button-form.component";
import { usePathname } from "next/navigation";

export type TFormRootProps = {
  children: React.ReactNode;
  title?: string;
  handleSubmit?: () => void;
  isModal?: boolean;
  paragraph?: string;
  isLoading?: boolean;
};

const FormRoot = ({
  children,
  title,
  paragraph,
  handleSubmit,
  isLoading = false,
  isModal,
}: TFormRootProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-header-container">
        <h1>{title}</h1>
        {paragraph && <p>{paragraph}</p>}
      </div>
      {children}
      <div className={isModal ? "buttons-modal-container" : ""}>
        <Button type={"submit"} isLoading={isLoading} children="Se connecter" />
        {isModal && (
          <Button type={"button"} isLoading={isLoading} children="Annuler" />
        )}
      </div>
    </form>
  );
};

export default FormRoot;
