# GPS Donation Service
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pagopa_pagopa-gps-donation-service&metric=alert_status)](https://sonarcloud.io/dashboard?id=pagopa_pagopa-gps-donation-service)

This project is an Azure Function to implement the microservice for **Donations**.

This service is called by [GPS](https://github.com/pagopa/pagopa-spontaneous-payments) 

---

## Technology Stack 📚
- Node JS (👀 `.node-version` file)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v2%2Cwindows%2Cts%2Cportal%2Cbash)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---


# How to run Locally 🚀
Before to start locally: 
- Create a `local.settings.json` file (👀 `local.settings.json.example`) 
- Install dependencies: `npm install`
- Then start the function:`npm start`


Use `/api-test/local-curl.sh` to try the HTTP function

---
# Run Tests 🧪
To run the unit tests and get the coverage: 

```
npm run test:coverage
```


---

## Contributors 👥
Made with ❤️ by PagoPa S.p.A.

### Mainteiners
See `CODEOWNERS` file


