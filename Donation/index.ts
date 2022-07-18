import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const addDays = (date: Date, days: number): Date => {
  date.setDate(date.getDate() + days);
  return date;
};

// POST http://localhost:7071/api/Donation
const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  context.log("HTTP trigger function processed a request.", req.body);

  // TODO check input

  const properties = req.body.properties;

  const body = {
    paymentOption: [
      {
        amount: properties.amount,
        description: properties.description,
        dueDate: addDays(new Date(), Number(process.env.ADD_DUE_DATE_DAYS)),
        fee: 0,
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
