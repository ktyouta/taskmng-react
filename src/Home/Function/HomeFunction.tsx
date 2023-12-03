import { ReactNode } from "react";
import { userInfoType } from "../../Common/Type/CommonType";
import { taskHistoryType } from "../Type/HomeType";

/**
 * タスクの作業履歴リストを作成
 * @param userInfo 
 * @param workHistoryList 
 */
export function createTaskHistory(userInfo: userInfoType, workHistoryList: taskHistoryType[])
    : JSX.Element[] {

    let tmpWorkDisplayList: JSX.Element[] = [];

    tmpWorkDisplayList = workHistoryList.map((element: taskHistoryType) => {

        let history = `${element.time}　${element.taskTitle}　${element.editType}　　作業ユーザー：${element.userName}`;
        let key = `${Object.values(element).join("-")}`;

        return (
            <li key={key}>
                {history}
            </li>
        );
    });

    return tmpWorkDisplayList;
}