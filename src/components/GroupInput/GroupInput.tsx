import CDatePicker from "components/CDatePicker";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { Controller, Control } from "react-hook-form";

export interface GroupInputProps {
  label: string;
  control: Control<any, any>;
  type: "text" | "date";
  groupInputData: any[];
}

const GroupInput = (props: GroupInputProps) => {
  const dateFormat = "DD/MM/YYYY";

  const { label, control, groupInputData = [], type = "text" } = props;
  const [borderStatus, setBorderStatus] = useState("none");

  const mouseOverGroupInput = () => {
    if (borderStatus !== "focus") {
      setBorderStatus("hover");
    }
  };
  const mouseOutGroupInput = () => {
    if (borderStatus !== "focus") {
      setBorderStatus("none");
    }
  };

  const focusGroupInput = () => setBorderStatus("focus");
  const blurGroupInput = () => setBorderStatus("none");

  return (
    <div
      className="group-input"
      onMouseEnter={mouseOverGroupInput}
      onMouseLeave={mouseOutGroupInput}
    >
      <fieldset className={borderStatus}>
        <legend>
          <span>{label}</span>
        </legend>
        <div className="group-input__container">
          {groupInputData.map((inputData, idx) => (
            <Fragment key={inputData.name}>
              <Controller
                control={control}
                name={inputData.name}
                render={({ field: { onBlur, ...restField } }) => {
                  const blurHandle = (e: any) => {
                    blurGroupInput();
                    onBlur();
                  };
                  const baseInputProps = {
                    className: "input-item",
                    onClick: focusGroupInput,
                    onBlur: blurHandle,
                  };

                  return type === "date" ? (
                    <CDatePicker
                      {...restField}
                      {...baseInputProps}
                      placeholder={inputData.placeholder}
                      format={dateFormat}
                      disabledDate={(current) =>
                        current.isBefore(moment(new Date()))
                      }
                    />
                  ) : (
                    <input {...restField} {...inputData} {...baseInputProps} />
                  );
                }}
              />
              {idx < groupInputData.length - 1 && (
                <div className="input-divider"></div>
              )}
            </Fragment>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default GroupInput;
