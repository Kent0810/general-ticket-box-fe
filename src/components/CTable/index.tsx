import React from "react";
import CTableHead from "components/CTableHead";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { ITableHeadCell } from "pages/interface";
import CTableRow from "components/CTableRow";
import { EmptyAirplane } from "assets";
interface Props {
  page?: number;
  rowsPerPage?: number;
  data: any[];
  headCells: ITableHeadCell[];
  handleClick?: (id: string) => void;
}

const CTable = (props: Props) => {
  const { data, headCells, handleClick } = props;

  return (
    <TableContainer className="ctable-container">
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
        <CTableHead headCells={headCells} />
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <CTableRow row={row} key={index} handleClick={handleClick} />
            ))
          ) : (
            <TableRow className="empty-row" aria-colspan={6}>
              <TableCell colSpan={headCells.length}>
                <img alt="empty" src={EmptyAirplane} />
                <p>No Data Found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CTable;
