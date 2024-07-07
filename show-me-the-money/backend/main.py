from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx

from common import XERO_ENDPOINT

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:8080"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/balance-sheet")
async def fetch_data():
    url = XERO_ENDPOINT
    headers = {
        "Content-Type": "application/json",
    }
    try:
        response = httpx.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data
    except httpx.HTTPStatusError as e:
        # This block catches errors specifically related to HTTP status codes (400 and above)
        print("HTTP status error occurred: ", e)
        return JSONResponse(
            status_code=e.response.status_code,
            content={"error": "HTTP status error: " + str(e)},
        )
    except httpx.HTTPError as e:
        # This block catches other HTTP errors, like connection issues
        print("Other HTTP error occurred: ", e)
        return JSONResponse(status_code=500, content={"error": "HTTP error: " + str(e)})
