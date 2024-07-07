import React from "react";
import { BalanceSheetData, Row } from "../types";

interface BalanceSheetProps {
  data: BalanceSheetData;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({ data }) => {
  const report = data.Reports[0];

  const renderRow = (row: Row, depth = 0) => {
    const style = {
      paddingLeft: `${depth * 20}px`,
      fontWeight: row.RowType === "SummaryRow" ? "bold" : "normal",
    };

    return (
      <React.Fragment key={row.Title || row.Cells[0].Value}>
        <tr>
          {row.Cells.map((cell, index) => (
            <td key={index} style={style}>
              {cell.Value}
            </td>
          ))}
        </tr>
        {row.Rows && row.Rows.map((subRow) => renderRow(subRow, depth + 1))}
      </React.Fragment>
    );
  };

  const renderSection = (section: Row) => (
    <React.Fragment key={section.Title}>
      {section.Title && (
        <tr>
          <th colSpan={3} style={{ textAlign: "left" }}>
            {section.Title}
          </th>
        </tr>
      )}
      {section.Rows && section.Rows.map((row) => renderRow(row))}
    </React.Fragment>
  );

  return (
    <div>
      <h2>Report Name: {report.ReportName}</h2>
      <h3>{report.ReportTitles.join(" - ")}</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {report.Rows[0].Cells.map((cell, index) => (
              <th key={index}>{cell.Value}</th>
            ))}
          </tr>
        </thead>
        <tbody>{report.Rows.slice(1).map((row) => renderSection(row))}</tbody>
      </table>
    </div>
  );
};

export default BalanceSheet;
