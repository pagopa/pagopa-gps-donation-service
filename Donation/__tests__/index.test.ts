// @ts-ignore
import {createHttpTrigger, runStubFunctionFromBindings} from 'stub-azure-function-context';
import httpTrigger from '../index';


describe("feature donation", () => {
    it('success', async () => {
        const req = {
            properties: {
                amount: "100",
                description: "ukraine"
            }
        };
        const result = await mockedRequestFactory(req);

        expect(result.res.status).toEqual(200);
        const body = result.res.body;
        expect(body.paymentOption[0].amount).toEqual(Number(req.properties.amount));
        expect(body.paymentOption[0].description).toEqual(req.properties.description);
        expect(result.res.headers['Content-Type']).toEqual("application/json");
    });


    it('wrong amount', async () => {
        const req = {
            properties: {
                amount: "-100",
                description: "ukraine"
            }
        };
        const result = await mockedRequestFactory(req);

        expect(result.res.status).toEqual(400);
        const body = result.res.body;
        expect(body.title).toEqual("Bad Request");
        expect(result.res.headers['Content-Type']).toEqual("application/json");
    });
});


async function mockedRequestFactory(body: any) {
    return runStubFunctionFromBindings(
        httpTrigger,
        [
            {
                type: 'httpTrigger',
                name: 'req',
                direction: 'in',
                data: createHttpTrigger(
                    'POST',
                    'http://example.com',
                    {},
                    {},
                    body,
                    {},
                ),
            },
            {type: 'http', name: 'result', direction: 'out'},
        ],
        new Date(),
    );
}
