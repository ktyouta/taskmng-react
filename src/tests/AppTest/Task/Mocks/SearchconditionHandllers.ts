import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { loginInfo, loginInfoResponse, searchcontionDatas } from "../../TestDatas";

export const SearchconditionHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`, async ({ request }) => {

        return HttpResponse.json(searchcontionDatas);
    }),
];