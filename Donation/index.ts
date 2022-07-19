import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { addDays, errorResponseFactory, Input } from "./handler";

// POST http://localhost:7071/api/Donation
const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  context.log("HTTP trigger function processed a request.", req.body);

  const input = Input.decode(req.body);

  // eslint-disable-next-line no-underscore-dangle
  if (input._tag === "Left") {
    // eslint-disable-next-line functional/immutable-data,sonarjs/no-duplicate-string
    context.res = errorResponseFactory(400, "Bad Request", "Request malformed");
    return;
  }

  const properties = input.right.properties;

  // check amount
  if (isNaN(properties.amount) || properties.amount < 0) {
    // eslint-disable-next-line functional/immutable-data
    context.res = errorResponseFactory(
      400,
      "Bad Request",
      "Amount must be a positive number"
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
        iuv: null,
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
      "Content-Type": "application/json"
    },
    status: 200
  };
};

export default httpTrigger;
