import httpTrigger from '../index'
import {
    runStubFunctionFromBindings,
    createHttpTrigger,
} from 'stub-azure-function-context'


describe("feature donation", () => {
    it('success', async () => {
        let req = {
            properties: {
                amount: 100,
                description: "ukraine"
            }
        };
        const result = await mockedRequestFactory(req)

        expect(result.res.status).toEqual(200)
        const body = result.res.body
        expect(body.paymentOption[0].amount).toEqual(req.properties.amount)
        expect(body.paymentOption[0].description).toEqual(req.properties.description)
        expect(result.res.headers['Content-Type']).toEqual("application/json")
    })


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
    )
}
