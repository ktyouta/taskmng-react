import { ReactNode } from "react";
import { userInfoType } from "../../Common/Type/CommonType";
import { taskHistoryType } from "../Type/HomeType";
import styled from "styled-components";
import { tableBodyType, tableHeadType, tableType } from "../../Common/Table";
import AccordionComponent from "../../Common/AccordionComponent";
import ButtonComponent from "../../Common/ButtonComponent";


//タイトルのスタイル
const TitleDiv = styled.div`
    text-align:left;
    padding-left:10%;
`;

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


/**
     * タスク詳細のURLをクリップボードにコピー
     * @param url 
     */
export const copyUrlToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
        .then(function () {
            alert("タスクのURLをコピーしました。");
        }, function (err) {
            alert("URLのコピーに失敗しました。");
        });
}


/**
 * 
 * @param workHistoryList 
 * @returns 
 */
export function createTaskHistoryTable(workHistoryList: taskHistoryType[])
    : tableType {

    //テーブルヘッダ
    let tableHead: tableHeadType[] = [];
    tableHead.push({
        content: "ID",
        width: '10%'
    });
    tableHead.push({
        content: "タイトル",
        width: '30%'
    });
    tableHead.push({
        content: "作業内容",
        width: '10%'
    });
    tableHead.push({
        content: "作業ユーザー",
        width: '20%'
    });
    tableHead.push({
        content: "作業日時",
        width: '10%'
    });
    tableHead.push({
        content: "タスク詳細のURL",
        width: '20%'
    });

    let tableBody: tableBodyType[][] = [];

    workHistoryList.forEach((element) => {
        let tableTrBody: tableBodyType[] = [];
        tableTrBody.push({
            content: element.taskId,
        });
        tableTrBody.push({
            content: <AccordionComponent
                text={
                    <TitleDiv>
                        {element.taskTitle}
                    </TitleDiv>
                }
                defaultHeight={'30px'}
            />,
        });
        tableTrBody.push({
            content: element.editType,
        });
        tableTrBody.push({
            content: element.userName,
        });
        tableTrBody.push({
            content: element.time,
        });
        tableTrBody.push({
            content: <ButtonComponent
                styleTypeNumber="BASE"
                title={"URLをコピー"}
                onclick={() => { copyUrlToClipboard(element.url) }}
            />,
        });

        tableBody.push(tableTrBody);
    });

    return {
        tableHead: tableHead,
        tableBody: tableBody,
        tableHeight: "100%",
        tableWidth: "96%",
    }
}

/**
 * タスクを年でフィルターする
 * @param orgTaskList 
 * @param selectYear 
 */
export function filterTaskList(orgTaskList: taskHistoryType[], selectYear: string,) {
    let tmpOrgTaskList: taskHistoryType[] = JSON.parse(JSON.stringify(orgTaskList));

    return tmpOrgTaskList.filter((element) => {
        //作業日時を取得する
        let updDateSpList = element.time?.split("/");
        if (!updDateSpList || updDateSpList.length !== 3) {
            return false;
        }

        //選択した年度に一致しない
        if (selectYear && selectYear !== updDateSpList[0]) {
            return false;
        }

        return true;
    });
}