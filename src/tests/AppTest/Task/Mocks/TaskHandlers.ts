import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { loginInfo, loginInfoResponse, taskDatas } from "../../TestDatas";

export const TaskHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`, async ({ request }) => {

        return HttpResponse.json(taskDatas);
    }),
];