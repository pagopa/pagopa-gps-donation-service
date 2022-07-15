import {AzureFunction, Context, HttpRequest} from "@azure/functions"

// POST http://localhost:7071/api/Donation
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.', req.body);
    const properties = req.body.properties

    const body = {
        paymentOption: [
            {
                iuv: null,
                amount: properties.amount,
                description: properties.description,
                isPartialPayment: false,
                dueDate: "2022-03-16T09:30:42.577", // TODO
                retentionDate: "2022-05-15T08:30:42.577", // TODO
                fee: 0,
                transfer: []
            }
        ]
    }
    context.res = {
        status: 200,
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    };

};

export default httpTrigger;
