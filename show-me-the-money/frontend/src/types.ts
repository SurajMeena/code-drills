export interface Cell {
  Value: string;
  Attributes?: { Value: string; Id: string }[];
}

export interface Row {
  RowType: string;
  Cells: Cell[];
  Title?: string;
  Rows?: Row[];
}

export interface BalanceSheetData {
  Reports: {
    ReportID: string;
    ReportName: string;
    ReportType: string;
    ReportTitles: string[];
    ReportDate: string;
    UpdatedDateUTC: string;
    Rows: Row[];
  }[];
}