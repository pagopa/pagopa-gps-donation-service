import { AzureFunction, Context, HttpRequest } from "@azure/functions";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
const httpTrigger: AzureFunction = async function(
  context: Context,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: HttpRequest
): Promise<void> {
  context.log("HTTP Info trigger function processed a request.");

  const responseMessage = { status: "OK" };

  // eslint-disable-next-line functional/immutable-data
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
};

export default httpTrigger;
