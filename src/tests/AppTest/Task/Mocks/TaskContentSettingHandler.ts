import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { loginInfo, loginInfoResponse, taskSettingDatas } from "../../TestDatas";

export const TaskContentSettingHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKCONTENTSETTING}`, async ({ request }) => {

        return HttpResponse.json(taskSettingDatas);
    }),
];