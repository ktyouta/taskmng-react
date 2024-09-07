import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { generalInfo } from "../../TestDatas";

export const GeneralHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`, async ({ request }) => {

        return HttpResponse.json(generalInfo);
    }),
];