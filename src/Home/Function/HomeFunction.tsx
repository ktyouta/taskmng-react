import { ReactNode } from "react";
import { userInfoType } from "../../Common/Type/CommonType";
import { taskHistoryType } from "../Type/HomeType";

/**
 * タスクの作業履歴リストを作成
 * @param userInfo 
 * @param workHistoryList 
 */
export function createTaskHistory(workHistoryList: taskHistoryType[])
    : JSX.Element[] {

    return workHistoryList.map((element: taskHistoryType) => {

        let key = `${Object.values(element).join("-")}`;

        return (
            <li key={key}>
                {element.historyMessage}
            </li>
        );
    });
}