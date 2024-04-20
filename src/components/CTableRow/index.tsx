import React from "react";
import { TableCell, TableRow, TableRowProps } from "@mui/material";

interface Props extends TableRowProps {
  isSelected?: boolean;
  row: any;
  handleClick?: (id: string) => void;
}

const CTableRow = (props: Props) => {
  const { row, isSelected = false, handleClick } = props;
  const { id, ...dataRow } = row;

  return (
    <TableRow
      hover
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
      onClick={() => {
        if (handleClick) handleClick(id);
      }}
      sx={{ cursor: "pointer" }}
    >
      {Object.keys(dataRow).map((key, idx) => {
        return (
          <TableCell key={`cell-${idx}`} align={"left"}>
            <span
              className={
                key === "status"
                  ? `cell-variant cell-variant__${dataRow[key]}`
                  : ""
              }
            >
              {dataRow[key]}
            </span>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CTableRow;
