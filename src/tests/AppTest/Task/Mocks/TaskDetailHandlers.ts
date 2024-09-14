import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { taskDatas, testTaskDetail } from "../Data/TestDatas";

//テスト用タスクデータの先頭1件のタスクID
const taskHeadDataId = taskDatas[0].id;

export const TaskDetailHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}/${taskHeadDataId}`, async ({ request }) => {

        return HttpResponse.json(testTaskDetail);
    }),
];