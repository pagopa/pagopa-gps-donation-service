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
                dueDate: addDays(new Date(), Number(process.env['ADD_DUE_DATE_DAYS'])),
                retentionDate: addDays(new Date(), Number(process.env['ADD_RETENTION_DATE_DAYS'])),
                fee: 0,
                transfer: [{
                    amount: properties.amount
                }]
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

function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

export default httpTrigger;
