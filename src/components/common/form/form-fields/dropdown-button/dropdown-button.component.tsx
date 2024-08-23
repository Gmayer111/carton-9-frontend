"use client";
import React, { useState } from "react";
import { TButtonForm } from "../../form";
import ButtonForm from "../button/button-form.component";

type TDropdownButtonProps = {
  handleActionList?: () => void;
  listItems?: TListItem[];
};

export type TListItem = {
  content: string;
};

const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  TButtonForm & TDropdownButtonProps
>(
  (
    {
      isLoading,
      children,
      handleActionList,
      isDisabled,
      hasDropdownIconButton,
      listItems,
    },
    ref
  ) => {
    const [displayList, setDisplayList] = useState<boolean>();
    const handleClickList = () => {
      handleActionList && handleActionList();
      setDisplayList(false);
    };
    return (
      <div className="dropwdown-button-container">
        <ButtonForm
          hasDropdownIconButton={hasDropdownIconButton}
          onClick={() => setDisplayList(true)}
          isLoading={isLoading}
          isDisabled={isDisabled}
          ref={ref}
          type="button"
        >
          {hasDropdownIconButton ? (
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          ) : (
            children
          )}
        </ButtonForm>
        {displayList && (
          <div className="dropdown-list-container">
            <ul>
              {listItems?.map((listItem) => (
                <li onClick={handleClickList}>{listItem.content}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export default DropdownButton;
