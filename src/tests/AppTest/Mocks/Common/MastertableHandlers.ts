import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { masterTable } from "../TestDatas";

export const MastertableHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTERTABLE}`, async ({ request }) => {

        return HttpResponse.json(masterTable);
    }),
];