import React from "react";

interface RowProps {
  isHeader?: boolean;
  items: string[];
}
export const Row = ({ items = [], isHeader }: RowProps) => {
  return (
    <tr className={isHeader ? "" : "row"}>
      {items?.map((item: string) => {
        return isHeader ? (
          <th key={item}>{item}</th>
        ) : (
          <td key={item}>{item}</td>
        );
      })}
    </tr>
  );
};

export default Row;
