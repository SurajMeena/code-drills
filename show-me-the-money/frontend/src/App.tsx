import React, { useEffect, useState } from "react";
import "./App.css";
import BalanceSheet from "./components/BalanceSheet";
import { BalanceSheetData } from "./types";

const App: React.FC = () => {
    const [balanceSheetData, setBalanceSheetData] = useState<BalanceSheetData | null>(
        null
    );
    const [error, setError] = useState<string | null>(null);
    const baseUrl = "http://localhost:8000";
    useEffect(() => {
        const fetchBalanceSheet = async () => {
            try {
                const response = await fetch(baseUrl + "/balance-sheet");
                if (!response.ok) {
                    throw new Error("Failed to fetch balance sheet");
                }
                const data = await response.json();
                setBalanceSheetData(data);
            } catch (err) {
                setError("Failed to fetch balance sheet. Please try again later.");
                console.error(err);
            }
        };

        fetchBalanceSheet();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!balanceSheetData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="App">
            <h1>Balance Sheet</h1>
            <BalanceSheet data={balanceSheetData}/>
        </div>
    );
};

export default App;
