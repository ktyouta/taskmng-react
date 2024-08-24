import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { authInfo } from "../TestDatas";

export const AuthHandlers = [
    http.post(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.AUTH}`, async ({ request }) => {

        return HttpResponse.json(authInfo);
    }),
];