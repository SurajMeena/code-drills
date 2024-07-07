import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "./App";

// Mock the fetch function
global.fetch = jest.fn();

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
            { Value: "" },
            { Value: "07 July 2024" },
            { Value: "08 July 2023" },
          ],
        },
        // Add more mock data as needed
      ],
    },
  ],
};

describe("App Component", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders loading state initially", () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({ json: () => Promise.resolve(mockBalanceSheetData) }),
            100
          )
        )
    );

    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders balance sheet data after successful fetch", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBalanceSheetData),
    });

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText("Balance Sheet - Demo Org - As at 07 July 2024")
      ).toBeInTheDocument();
    });
  });

  it("renders error message on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to fetch balance sheet. Please try again later."
        )
      ).toBeInTheDocument();
    });
  });
});
