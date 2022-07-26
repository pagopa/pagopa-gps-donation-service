curl --location --request POST 'http://localhost:7071/donations/paymentoptions' \
--header 'Content-Type: application/json' \
--data-raw '{
    "properties": {
        "amount": "100",
        "description": "hello"
    }
}'
