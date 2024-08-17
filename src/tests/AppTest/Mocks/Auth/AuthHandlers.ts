import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';

export const AuthHandlers = [
    http.post(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.AUTH}`, async ({ request }) => {

        console.log("AuthAPI is called");

        return HttpResponse.json(
            {
                errMessage: "",
                userInfo: {
                    userId: "f",
                    userName: "テスト管理者",
                    password: "f",
                    auth: "3",
                    registerTime: "2024/01/01",
                    updTime: "2024/08/10",
                    deleteFlg: "0",
                    iconType: "2",
                    iconUrl: "http://localhost:3000/img/standard/testimg1.png"
                }
            }
        );
    }),
];