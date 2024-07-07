import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import React from "react";
import BalanceSheet from "./BalanceSheet";
import {BalanceSheetData} from "../types";

const mockBalanceSheetData = {
    Reports: [
        {
            ReportID: "BalanceSheet",
            ReportName: "Balance Sheet",
            ReportType: "BalanceSheet",
            ReportTitles: ["Balance Sheet", "Demo Org", "As at 07 July 2024"],
            ReportDate: "07 July 2024",
            UpdatedDateUTC: "/Date(1720340396952)/",
            Rows: [
                {
                    RowType: "Header",
                    Cells: [
                        {Value: ""},
                        {Value: "07 July 2024"},
                        {Value: "08 July 2023"},
                    ],
                },
                {
                    RowType: "Section",
                    Title: "Assets",
                    Rows: [
                        {
                            RowType: "Row",
                            Cells: [
                                {Value: "Current Assets"},
                                {Value: "100000"},
                                {Value: "90000"},
                            ],
                        },
                        {
                            RowType: "Row",
                            Cells: [
                                {Value: "Non-Current Assets"},
                                {Value: "50000"},
                                {Value: "60000"},
                            ],
                        },
                        {
                            RowType: "SummaryRow",
                            Cells: [
                                {Value: "Total Assets"},
                                {Value: "150000"},
                                {Value: "150000"},
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

describe("BalanceSheet Component", () => {
    it("renders report name and titles", () => {
        render(<BalanceSheet data={mockBalanceSheetData as BalanceSheetData}/>);
        expect(
            screen.getByText("Balance Sheet - Demo Org - As at 07 July 2024")
        ).toBeInTheDocument();
    });

    it("renders table headers", () => {
        render(<BalanceSheet data={mockBalanceSheetData as BalanceSheetData}/>);
        expect(screen.getByText("07 July 2024")).toBeInTheDocument();
        expect(screen.getByText("08 July 2023")).toBeInTheDocument();
    });

    it("renders section titles", () => {
        render(<BalanceSheet data={mockBalanceSheetData as BalanceSheetData}/>);
        expect(screen.getByText("Assets")).toBeInTheDocument();
    });

    it("renders row data", () => {
        render(<BalanceSheet data={mockBalanceSheetData as BalanceSheetData}/>);
        expect(screen.getByText("Current Assets")).toBeInTheDocument();
        expect(screen.getByText("100000")).toBeInTheDocument();
        expect(screen.getByText("90000")).toBeInTheDocument();
    });

    it("renders summary rows in bold", () => {
        render(<BalanceSheet data={mockBalanceSheetData as BalanceSheetData}/>);
        const summaryRow = screen.getByText("Total Assets");
        expect(summaryRow).toHaveStyle("font-weight: bold");
    });
});
