import React from "react";
import { MenuItem, Select, SelectProps } from "@mui/material";
import { SelectDataType } from "utils/base/model";

interface Props extends SelectProps {
  setSearchValue?: (searchValue: number) => void;
  valid?: boolean;
  options: SelectDataType[];
}

const CSelect = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const {
    options,
    placeholder,
    className,
    value,
    valid = true,
    setSearchValue,
    ...restProps
  } = props;


  return (
    <Select
      {...Object.assign({}, restProps, { valid: undefined })}
      className={`cinput ${className} cinput-${valid ? "valid" : "invalid"}`}
      ref={ref}
      fullWidth
      onChange={(e)=>{
        setSearchValue && setSearchValue(e.target.value as number)
      }}
      value={value !== 0 ? value : 'defaultValue'}
    >
      <MenuItem sx={{ fontStyle: "italic" }} value="defaultValue" disabled>
        <em>Choose a type of ticket</em>
      </MenuItem>
      
      {options.map((opt) => (
        <MenuItem key={opt.id} value={opt.id}>
          {opt.value}
        </MenuItem>
      ))}
    </Select>
  );
});

export default CSelect;
