# Prometheus Metrics Endpoint Design

## Objective
Expose a `/metrics` endpoint for Prometheus to scrape, providing per-route HTTP metrics for monitoring the buggy app's behavior.

## Architecture

### Components
1. **prom-client** — Node.js Prometheus client library for metric collection
2. **Metrics middleware** — Express middleware to collect HTTP request metrics
3. **`/metrics` endpoint** — Exposes metrics in Prometheus text format

### Data Flow
```
Request → Express route handler
              ↓
         Metrics middleware (collects: method, route, status code, duration)
              ↓
         prom-client registry
              ↓
         GET /metrics → Prometheus scrapes on interval
```

## Implementation

### 1. Install dependency
```bash
npm install prom-client
```

### 2. Metrics setup (index.js)
- Import `prom-client`
- Enable default metrics (memory, CPU, etc.)
- Create HTTP metrics:
  - `http_requests_total` — counter with labels: method, route, status_code
  - `http_request_duration_seconds` — histogram with labels: method, route, status_code
- Add middleware before routes to track request start time
- Add response listener to record metrics on completion
- Expose `GET /metrics` endpoint returning `register.metrics()`

### Metrics Exposed
| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `http_requests_total` | Counter | method, route, status_code | Total HTTP requests |
| `http_request_duration_seconds` | Histogram | method, route, status_code | Request latency |
| Default metrics | Various | — | Node.js memory, CPU, etc. |

### Route Normalization
Routes like `/api/slow`, `/api/get-weather`, and `/` will be tracked by their path. The middleware captures `req.path` for consistent labeling.

## Error Handling
- If metrics collection fails, the request continues normally (fail-open)
- `/metrics` endpoint returns 500 on registry error

## Testing
- `GET /metrics` returns Prometheus-formatted text
- Make requests to endpoints, verify metrics increment
- Verify default Node.js metrics are present