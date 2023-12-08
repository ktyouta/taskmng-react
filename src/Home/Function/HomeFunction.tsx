import { ReactNode } from "react";
import { userInfoType } from "../../Common/Type/CommonType";
import { taskHistoryType } from "../Type/HomeType";
import styled from "styled-components";

/**
 * タスクの作業履歴リストを作成
 * @param userInfo 
 * @param workHistoryList 
 */

const WorkHistoryListLi = styled.li`
    margin-bottom:1%;
`;

export function createTaskHistory(workHistoryList: taskHistoryType[])
    : JSX.Element[] {

    return workHistoryList.map((element: taskHistoryType) => {

        let key = `${Object.values(element).join("-")}`;

        return (
            <WorkHistoryListLi key={key}>
                {element.historyMessage}
            </WorkHistoryListLi>
        );
    });
}