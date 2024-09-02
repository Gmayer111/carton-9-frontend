import React from "react";
import Link from "next/link";

export type TLinkProps = {
  textContent: string;
  path: string;
  linkContent: string;
};

const LinkForm = ({ textContent, path, linkContent }: TLinkProps) => {
  return (
    <div className="link-form-container">
      <p>
        {textContent}
        <Link href={path}>{linkContent}</Link>
      </p>
    </div>
  );
};

export default LinkForm;
