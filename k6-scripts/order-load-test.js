import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "30s", target: 10 },
    { duration: "1m", target: 20 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const url = "http://order-service:8000/api/orders";

  const payload = JSON.stringify({
    "clientId": 1,
    "total": 100,
    "paymentMethodId": 1,
    "payment": {
        "payments": [
            {
                "total": 100,
                "paymentMethodId": 1
            }
        ]
    },
    "products": [
        {
            "id": 3,
            "name": "Mouse Gamer",
            "quantity": 1,
            "price": 100
        }
    ]
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status 201": (r) => r.status === 201,
  });

  sleep(1);
}
