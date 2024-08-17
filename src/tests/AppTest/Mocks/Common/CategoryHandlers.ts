import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';

export const CategoryHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`, async ({ request }) => {

        return HttpResponse.json(
            [
                {
                    id: "CATEGORY-1",
                    name: "ホーム",
                    path: "/",
                    componentName: "Home",
                    auth: "1",
                    isHidden: "0",
                    deleteFlg: "0",
                    order: "1",
                    "registerTime": "",
                    updTime: "2024/06/28",
                    userId: "f"
                },
                {
                    id: "CATEGORY-3",
                    name: "マスタ編集",
                    path: "/master",
                    componentName: "Master",
                    auth: "2",
                    isHidden: "0",
                    deleteFlg: "0",
                    order: "2",
                    "registerTime": "",
                    updTime: "2024/06/28",
                    userId: "f"
                },
                {
                    id: "CATEGORY-4",
                    name: "新規マスタ追加",
                    path: "/addmaster",
                    componentName: "AddMaster",
                    auth: "2",
                    isHidden: "0",
                    deleteFlg: "0",
                    order: "3",
                    "registerTime": "",
                    updTime: "2024/06/28",
                    userId: "f"
                },
                {
                    id: "CATEGORY-5",
                    name: "タスク管理",
                    path: "/task",
                    componentName: "Task",
                    auth: "1",
                    isHidden: "0",
                    deleteFlg: "0",
                    order: "4",
                    "registerTime": "",
                    updTime: "2024/06/28",
                    userId: "f"
                },
                {
                    id: "CATEGORY-6",
                    name: "メモ管理",
                    path: "/memo",
                    componentName: "Memo",
                    auth: "1",
                    isHidden: "0",
                    deleteFlg: "0",
                    order: "5",
                    "registerTime": "2024/03/20",
                    updTime: "2024/06/28",
                    userId: "f"
                },
                {
                    name: "作業履歴",
                    path: "/history",
                    componentName: "History",
                    auth: "3",
                    isHidden: "0",
                    userId: "f",
                    "registerTime": "2023/12/30",
                    updTime: "2024/06/28",
                    deleteFlg: "0",
                    id: "CATEGORY-9",
                    order: "6"
                },
                {
                    id: "CATEGORY-7",
                    name: "設定",
                    path: "/setting",
                    componentName: "Setting",
                    auth: "3",
                    isHidden: "0",
                    deleteFlg: "0",
                    order: "7",
                    "registerTime": "",
                    updTime: "2024/06/28",
                    userId: "f"
                },
                {
                    name: "ユーザー情報",
                    path: "/user",
                    componentName: "User",
                    auth: "1",
                    isHidden: "1",
                    userId: "f",
                    "registerTime": "2023/12/30",
                    updTime: "2024/06/28",
                    deleteFlg: "0",
                    id: "CATEGORY-8",
                    order: "8"
                }
            ]
        );
    }),
];