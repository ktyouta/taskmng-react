import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { searchcontionDatas } from "../Data/TestDatas";

export const SearchconditionHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`, async ({ request }) => {

        return HttpResponse.json(searchcontionDatas);
    }),
];