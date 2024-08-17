import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';

export const HomeHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}`, async ({ request }) => {

        return HttpResponse.json(
            [
                {
                    time: "2024/08/04",
                    userId: "f",
                    taskId: "TASKID-137",
                    editValue: "2",
                    deleteFlg: "0",
                    id: "152",
                    editType: "更新",
                    userName: "テスト管理者",
                    iconUrl: "http://localhost:3000/img/standard/testimg1.png",
                    taskTitle: "他ユーザー更新テスト2",
                    priority: "1",
                    status: "1",
                    url: "http://localhost:3000/task/TASKID-137"
                },
            ]
        );
    }),
];