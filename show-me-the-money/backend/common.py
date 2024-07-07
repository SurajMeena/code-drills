import os

XERO_HOST = os.getenv("XERO_API_URL", "http://localhost:3000")
XERO_ENDPOINT = f"{XERO_HOST}/api.xro/2.0/Reports/BalanceSheet"
