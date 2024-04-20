import React from "react";
import { BaseProps } from "pages/interface";

interface Props extends BaseProps {}

const WrapperContainer = (props: Props) => {
  const { children } = props;

  return (
    <div className="container">
      <div className="wrapper-container">{children}</div>
    </div>
  );
};

export default WrapperContainer;
