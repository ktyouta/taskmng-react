import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';

export const LoginHandlers = [
    http.post(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.LOGIN}`, async ({ request }) => {
        const { userId, password } = (await request.json()) as {
            userId?: string;
            password?: string;
        };

        console.log("request:" + request);

        if (userId === "test" && password === "test") {
            return HttpResponse.json(
                {
                    errMessage: "",
                    token: "token",
                    userInfo: {
                        userId: "f"
                    }
                }
            );
        } else {
            return HttpResponse.json(null, { status: 404 });
        }
    }),
];