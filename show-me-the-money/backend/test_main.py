import pytest
from fastapi.testclient import TestClient
import httpx
from httpx import Response
from main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def mock_httpx_get(monkeypatch):
    def mock_get(url, headers):
        request = httpx.Request(method="GET", url=url)
        response = httpx.Response(200, request=request, json={"data": "mocked_data"})
        return response

    monkeypatch.setattr("httpx.get", mock_get)

def test_fetch_data_success(client, mock_httpx_get):
    response = client.get("/fetch-data")
    assert response.status_code == 200
    assert response.json() == {"data": "mocked_data"}

def test_fetch_data_http_status_error(client, monkeypatch):
    def mock_get(url, headers):
        request = httpx.Request(method="GET", url=url)
        response = httpx.Response(404, request=request)
        raise httpx.HTTPStatusError(message="404 Not Found", request=request, response=response)

    monkeypatch.setattr("httpx.get", mock_get)

    response = client.get("/fetch-data")
    assert response.status_code == 404
    assert response.json() == {"error": "HTTP status error: 404 Not Found"}

def test_fetch_data_other_http_error(client, monkeypatch):
    def mock_get(url, headers):
        raise httpx.HTTPError("Connection error")

    monkeypatch.setattr("httpx.get", mock_get)

    response = client.get("/fetch-data")
    assert response.status_code == 500
    assert response.json() == {"error": "HTTP error: Connection error"}