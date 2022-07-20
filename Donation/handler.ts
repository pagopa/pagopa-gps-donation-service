import * as t from "io-ts";

const ProblemJson = t.type({
  detail: t.string,
  status: t.number,
  title: t.string
});

const Properties = t.type({
  amount: t.number,
  description: t.string
});

export const Input = t.type({
  properties: Properties
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const errorResponseFactory = (
  status: number,
  title: string,
  detail: string,
  requestId: string
) => ({
  body: ProblemJson.encode({ detail, status, title }),
  headers: {
    "Content-Type": "application/json",
    "X-Request-Id": requestId
  },
  status: 400
});

export const addDays = (date: Date, days: number): Date => {
  date.setDate(date.getDate() + days);
  return date;
};
