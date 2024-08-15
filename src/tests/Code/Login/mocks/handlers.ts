import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';

export const handlers = [
    http.post(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.LOGIN}`, async ({ request }) => {
        const { userId, password } = (await request.json()) as {
            userId?: string;
            password?: string;
        };

        if (userId === "test" && password === "test") {
            return HttpResponse.json(
                {
                    errMessage: "",
                    token: "test",
                    status: 200
                }
            );
        } else {
            return HttpResponse.json(null, { status: 404 });
        }
    }),
];