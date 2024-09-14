import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { taskSettingDatas } from "../Data/TestDatas";

export const TaskInputSettingHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKINPUTSETTING}`, async ({ request }) => {

        return HttpResponse.json(taskSettingDatas);
    }),
];