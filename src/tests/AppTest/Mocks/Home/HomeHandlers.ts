import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { taskHistory } from "../TestDatas";

export const HomeHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}`, async ({ request }) => {

        return HttpResponse.json(taskHistory);
    }),
];