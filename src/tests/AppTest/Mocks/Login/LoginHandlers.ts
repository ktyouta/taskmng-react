import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { loginInfo, loginInfoResponse } from "../TestDatas";

export const LoginHandlers = [
    http.post(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.LOGIN}`, async ({ request }) => {
        const { userId, password } = (await request.json()) as {
            userId?: string;
            password?: string;
        };

        if (userId === loginInfo.userId && password === loginInfo.password) {

            return HttpResponse.json(loginInfoResponse);
        } else {

            return HttpResponse.json(null, { status: 404 });
        }
    }),
];