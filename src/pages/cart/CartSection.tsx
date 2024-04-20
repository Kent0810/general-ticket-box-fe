import { BaseProps } from "pages/interface";
import React from "react";

interface Props extends BaseProps {
  title: string;
  order: number;
}

const CartSection = (props: Props) => {
  const { order, title, children } = props;
  return (
    <section className="cart-section">
      <div className="cart-section__header">
        <div className="cart-section__header--order">{order}</div>
        <div className="cart-section__header--title">{title}</div>
      </div>

      <div className="cart-section__body">{children}</div>
    </section>
  );
};

export default CartSection;
