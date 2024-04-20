import { ClickAwayListener } from "@mui/base";
import React from "react";
import { forwardRef } from "react";

interface Props {
  dropdownState: string;
  children: React.ReactNode;
  className: string;
  closeDropdown: () => void;
}

const CustomDropdown = forwardRef<any, Props>(
  (
    { dropdownState = "closed", children, className = "", closeDropdown },
    ref
  ) => {
    const clickAwayHandler = () => {
      if (dropdownState === "open" && closeDropdown) {
        closeDropdown();
      }
    };

    return (
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={clickAwayHandler}
      >
        <div
          className={`custom-dropdown ${className}`}
          data-state={dropdownState}
          ref={ref}
        >
          {children}
        </div>
      </ClickAwayListener>
    );
  }
);

export default CustomDropdown;
