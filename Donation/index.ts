import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as E from "fp-ts/lib/Either";
import { v4 as uuidv4 } from "uuid";
import { addDays, errorResponseFactory, Input } from "./handler";

// POST http://localhost:7071/api/Donation
const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  context.log("HTTP trigger function processed a request.", req.body);
  context.log(process.env);

  const input = Input.decode(req.body);

  if (E.isLeft(input)) {
    // eslint-disable-next-line functional/immutable-data,sonarjs/no-duplicate-string
    context.res = errorResponseFactory(
      400,
      "Bad Request",
      "Request malformed",
      // eslint-disable-next-line sonarjs/no-duplicate-string
      req.headers["x-request-id"] ?? uuidv4()
    );
    return;
  }
  const properties = input.right.properties;

  // check amount
  if (isNaN(properties.amount) || properties.amount < 0) {
    // eslint-disable-next-line functional/immutable-data
    context.res = errorResponseFactory(
      400,
      "Bad Request",
      "Amount must be a positive number",
      req.headers["x-request-id"] ?? uuidv4()
    );
    return;
  }

  // calculation...
  const body = {
    paymentOption: [
      {
        amount: properties.amount,
        description: properties.description,
        dueDate: addDays(new Date(), Number(process.env.ADD_DUE_DATE_DAYS)),
        isPartialPayment: false,
        retentionDate: addDays(
          new Date(),
          Number(process.env.ADD_RETENTION_DATE_DAYS)
        ),
        transfer: [
          {
            amount: properties.amount
          }
        ]
      }
    ]
  };

  // eslint-disable-next-line functional/immutable-data
  context.res = {
    body,
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": req.headers["x-request-id"] ?? uuidv4()
    },
    status: 200
  };
};

export default httpTrigger;
