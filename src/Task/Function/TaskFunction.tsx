import React, { SetStateAction } from "react";
import { bodyObj, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import { apiTaskDetailType, customAttributeListType, customAttributeRequestBodyType, displayTaskType, editDisplayTaskType, inputTaskSettingType, taskContentDisplayType, taskContentSettingType, taskListType, taskRequestBodyType, taskSearchConditionType, viewTaskType } from "../Type/TaskType";
import { ReactNode, createRef } from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import { createRequestBody, getNowDate, parseStrDate, requestBodyInputCheck } from "../../Common/Function/Function";
import ButtonComponent from "../../Common/ButtonComponent";
import styled from "styled-components";

//ステータス
//未完了
const NOCOMP_STATUS = "1";
//完了
const COMP_STATUS = "2";
//保留
const HOLD_STATUS = "3";
//対応中
const WORKING_STATUS = "4";

//フッターのスタイル
const TaskConditionItemDiv = styled.div`
    display: flex;
    align-items: center;
`;

const TaskSearchAreaDt = styled.dt`
    height: 100%;
    width: auto;
    align-items: center;
`;


/**
 * 画面表示用のカスタム属性リストを作成
 * @param customAttribute APIから取得したカスタム属性リスト
 * @returns 
 */
export function createCustomAttributeViewList(customAttribute: customAttributeListType[]): viewTaskType[] {
    let tmpViewCustomAttributeList: viewTaskType[] = [];

    customAttribute.forEach((element) => {
        let tmp = element.value;
        let list = element.selectList;

        //選択形式の場合は名称を取得する
        if (list && list.length > 0) {

            //複数選択可能形式(チェックボックス)の場合
            if (tmp && tmp.includes(",")) {
                let tmpArr = tmp.split(",");
                let valArr: string[] = [];
                tmpArr.forEach((element1) => {
                    let selected = list.find((element2) => element2.value === element1);
                    if (selected) {
                        valArr.push(selected.label);
                    }
                });
                tmp = valArr.join(",");
            }
            else {
                let selected = list.find((element1) => element1.value === tmp);
                //選択値に該当するデータが存在する場合
                if (selected) {
                    tmp = selected.label;
                }
                else {
                    tmp = "";
                }
            }
        }

        tmpViewCustomAttributeList.push({
            title: element.name,
            value: tmp,
        });
    });
    return tmpViewCustomAttributeList;
}

/**
 * 編集画面表示用のカスタム属性リストを作成
 * @param customAttribute APIから取得したカスタム属性リスト
 * @returns 
 */
export function createCunstomAttributeEditList(customAttribute: customAttributeListType[],
    customAttributeInputSetting: refInfoType[]): refInfoType[] {
    let tmpEditCustomAttributeList: refInfoType[] = [];

    customAttributeInputSetting.forEach((element) => {

        let tmp = element.initValue;
        let list = element.selectList ? [...element.selectList] : [];

        let tmpCustomAttribute = customAttribute.find((element1) => {
            return element1.id === element.id;
        });

        //既存のカスタム属性が取得できた場合は、その選択値をセット
        if (tmpCustomAttribute) {
            tmp = tmpCustomAttribute.value;
        }

        //選択形式の場合は名称を取得する
        if (list && list.length > 0) {

            //複数選択可能形式(チェックボックス)の場合
            if (tmp && tmp.includes(",")) {
                let tmpArr = tmp.split(",");
                let valArr: string[] = [];
                tmpArr.forEach((element1) => {
                    let selected = list.find((element2) => element2.value === element1);
                    if (selected) {
                        valArr.push(selected.value);
                    }
                });
                tmp = valArr.join(",");
            }
            else {
                let selected = list.find((element1) => element1.value === tmp);
                //選択値に該当するデータが存在する場合
                if (selected) {
                    tmp = selected.value;
                }
                else {
                    tmp = "";
                }
            }

            //コンボボックスの場合は先頭に空文字を追加
            if (element.type === "select") {
                list?.unshift({
                    value: "",
                    label: ""
                });
            }
        }

        tmpEditCustomAttributeList.push({
            id: element.id,
            name: element.name,
            type: element.type,
            length: element.length,
            disabled: false,
            visible: true,
            initValue: tmp,
            selectList: list,
            ref: createRef()
        });
    });

    return tmpEditCustomAttributeList;
}

/**
 * 編集画面表示用のカスタム属性リストを作成
 * @param customAttribute APIから取得したカスタム属性リスト
 * @returns 
 */
export function createCunstomAttributeRegistList(customAttribute: refInfoType[]): refInfoType[] {
    let tmpEditCustomAttributeList: refInfoType[] = [];

    customAttribute.forEach((element) => {

        //コンボボックスの場合は先頭に空文字を追加
        if (element.type === "select") {
            element.selectList?.unshift({
                value: "",
                label: ""
            });
        }

        tmpEditCustomAttributeList.push({
            id: element.id,
            name: element.name,
            type: element.type,
            length: element.length,
            disabled: false,
            visible: true,
            initValue: element.initValue,
            selectList: element.selectList,
            description: element.description,
            isRequired: element.isRequired,
            ref: createRef(),
        });
    });
    return tmpEditCustomAttributeList;
}

//カスタム属性のリクエストボディの作成
export function createTaskCustomAttributeRequestBody(refInputArray: refInfoType[]): customAttributeRequestBodyType[] {
    let tmpBody: customAttributeRequestBodyType[] = [];
    //bodyの作成
    refInputArray.forEach((element) => {
        let postValue: string | undefined = element.initValue;
        if (element.ref && element.ref.current) {
            postValue = element.ref?.current?.refValue;
        }
        tmpBody.push({
            customAttributeId: element.id,
            selectedValue: postValue,
        });
    });
    return tmpBody;
}

/**
 * タスク編集画面のrefリストを作成
 * @param taskSettingList 
 * @param updTask 
 * @param generalDataList 
 * @param customAttributeInputSetting 
 * @returns 
 */
export function createUpdRefArray(taskSettingList: inputTaskSettingType[], updTask: apiTaskDetailType,
    generalDataList: generalDataType[], customAttributeInputSetting: refInfoType[]
): editDisplayTaskType {

    let tmpRefInfoArray: refInfoType[] = [];
    let tmpEditCustomAttributeList: refInfoType[] = [];

    taskSettingList.forEach((element) => {
        let tmpValue: string | undefined = undefined;

        //カスタム属性をセット
        if (element.id === "customAttribute") {
            if (!updTask?.customAttribute) {
                return;
            }
            tmpEditCustomAttributeList = createCunstomAttributeEditList(updTask.customAttribute, customAttributeInputSetting);
            return;
        }

        for (const [columnKey, value] of Object.entries(updTask?.default as {})) {
            //キーの一致する要素を取り出す
            if (element.id === columnKey) {
                tmpValue = value as string;
                break;
            }
        }
        let isVisible = true;
        let tmpSelectLits: comboType[] = [];
        //項目の表示非表示
        if (element.isHidden) {
            isVisible = false;
        }
        //リストキーが存在する(選択項目)
        if (element.listKey && generalDataList) {
            tmpSelectLits = generalDataList.filter((item) => {
                return item.id === element.listKey;
            });
        }
        tmpRefInfoArray.push({
            id: element.id,
            name: element.name,
            type: element.type,
            length: element.length,
            //キーに一致するデータが存在する場合はその値を表示
            initValue: tmpValue ?? element.initValue,
            //閲覧モードの場合は全項目編集不可
            disabled: element.disabled,
            visible: isVisible,
            selectList: tmpSelectLits,
            description: element.description,
            isRequired: element.isRequired,
            ref: createRef(),
        });
    });

    return {
        default: tmpRefInfoArray,
        customAttribute: tmpEditCustomAttributeList,
    }
}

/**
 * タスク新規追加画面のrefリストを作成
 * @param taskSettingList 
 * @param generalDataList 
 * @param customAttributeInputSetting 
 * @returns 
 */
export function createRegistRefArray(taskSettingList: inputTaskSettingType[],
    generalDataList: generalDataType[], customAttributeInputSetting: refInfoType[]
): editDisplayTaskType {

    let tmpRefInfoArray: refInfoType[] = [];
    let tmpEditCustomAttributeList: refInfoType[] = [];

    taskSettingList.forEach((element) => {
        let isVisible = true;
        let tmpSelectLits: comboType[] = [];

        //カスタム属性をセット
        if (element.id === "customAttribute") {
            tmpEditCustomAttributeList = createCunstomAttributeRegistList(customAttributeInputSetting);
            return;
        }

        //項目の表示非表示
        if (element.isHidden || !element.isNewCreateVisible) {
            isVisible = false;
        }
        //リストキーが存在する(選択項目)
        if (element.listKey) {
            tmpSelectLits = generalDataList.filter((item) => {
                return item.id === element.listKey;
            });
        }
        tmpRefInfoArray.push({
            id: element.id,
            name: element.name,
            type: element.type,
            length: element.length,
            //キーに一致するデータが存在する場合はその値を表示
            initValue: element.initValue,
            disabled: element.disabled,
            visible: isVisible,
            selectList: tmpSelectLits,
            description: element.description,
            isRequired: element.isRequired,
            ref: createRef(),
        });
    });

    return {
        default: tmpRefInfoArray,
        customAttribute: tmpEditCustomAttributeList,
    }
}

/**
 * タスク新規追加画面のrefリストを作成
 * @param taskSearchConditionList 
 * @param searchConditionObj 
 * @param generalDataList 
 * @returns 
 */
export function createSearchRefArray(taskSearchConditionList: taskSearchConditionType[],
    searchConditionObj: {
        [key: string]: string;
    }, generalDataList: generalDataType[]
): refInfoType[] {

    let tmpRefInfoArray: refInfoType[] = [];

    taskSearchConditionList.forEach((element) => {
        let tmpValue: string | undefined = undefined;
        for (const [columnKey, value] of Object.entries(searchConditionObj as {})) {
            //キーの一致する要素を取り出す
            if (element.id === columnKey) {
                tmpValue = value as string;
                break;
            }
        }
        let tmpSelectLits: comboType[] = [];
        //リストキーが存在する(選択項目)
        if (element.listKey) {
            tmpSelectLits = generalDataList.filter((item) => {
                return item.id === element.listKey;
            });
        }
        tmpRefInfoArray.push({
            id: element.id,
            name: element.name,
            type: element.type,
            //キーに一致するデータが存在する場合はその値を表示
            initValue: tmpValue ?? element.value,
            selectList: tmpSelectLits,
            ref: createRef(),
            length: element.length,
            disabled: false,
            visible: !element.isHidden,
        });
    });

    return tmpRefInfoArray;
}

/**
 * タスクの検索条件domを作成
 * @param taskSearchConditionList 
 * @param searchConditionObj 
 * @param generalDataList 
 * @returns 
 */
export function createSearchDispCondition(taskSearchConditionList: taskSearchConditionType[],
    searchConditionObj: {
        [key: string]: string;
    }, generalDataList: generalDataType[]
): ReactNode[] {

    let tmpDisplayList: ReactNode[] = [];

    Object.keys(searchConditionObj).forEach((key) => {
        taskSearchConditionList.some((item) => {
            //値がセットされている検索条件
            if (key === item.id) {
                if (!searchConditionObj[key]) {
                    return true;
                }
                let value = searchConditionObj[key];
                //複数選択項目
                if (item.listKey) {
                    value = "";
                    let tmpSelectLits: comboType[] = [];
                    tmpSelectLits = generalDataList.filter((list) => {
                        return list.id === item.listKey;
                    });
                    let valArray = searchConditionObj[key].split(",");
                    //選択値に対応したラベルを取得
                    valArray.forEach((val) => {
                        tmpSelectLits.some((list) => {
                            if (val === list.value) {
                                value += ` ${list.label} /`;
                                return true;
                            }
                        });
                    });
                    //末尾の/を削除
                    if (value.slice(-1) === "/") {
                        value = value.slice(0, -1);
                    }
                }
                //日付の場合は/を入れる
                if (item.type === "date") {
                    value = parseStrDate(value);
                }
                //画面表示用の検索条件を追加
                tmpDisplayList.push(
                    <React.Fragment>
                        <TaskConditionItemDiv>
                            <TaskSearchAreaDt>{`[${item.name}]：`}</TaskSearchAreaDt>
                            <TaskSearchAreaDt>{`${value}`}</TaskSearchAreaDt>
                        </TaskConditionItemDiv>
                        <SpaceComponent space={"3%"} />
                    </React.Fragment>
                );
                return true;
            }
        });
    });

    return tmpDisplayList;
}

/**
 * タスクのコンテンツリストを作成
 * @param taskList 
 * @param generalDataList 
 * @param taskContentSetting 
 * @param openModal 
 * @param moveTaskDetail 
 * @returns 
 */
export function createTaskContentList(taskList: taskListType[], generalDataList: generalDataType[],
    taskContentSetting: taskContentSettingType[], openModal: (id: string) => void,
    moveTaskDetail: (taskId: string) => void
): taskContentDisplayType[] {

    let tmpDisplayTaskList: taskContentDisplayType[] = [];
    //現在日時
    const nowDate = getNowDate(new Date());
    //タスクのディープコピー
    const tmpTaskList: taskListType[] = JSON.parse(JSON.stringify(taskList));

    //設定値をもとに画面に表示する項目を作成
    tmpTaskList.forEach(element => {
        //画面表示用タスク
        let displayTaskObj: taskContentDisplayType = {
            id: "",
            title: "",
            bdColor: undefined,
            titleBgColor: undefined,
            infoBgColor: undefined,
            editButton: <></>,
            content: [],
            onClickTitle: () => { },
        };

        //タスクの状態に応じて背景色を変える
        //ステータス
        let status = element["status"];
        //期限
        let limitTime = element["limitTime"];
        //背景色の設定
        let bgButtonColor: string | undefined = undefined;
        //ステータスとタスクが存在する場合
        if (status && limitTime) {
            //期限切れのタスク
            if (limitTime < nowDate) {
                switch (status) {
                    //未対応
                    case NOCOMP_STATUS:
                        displayTaskObj.bdColor = "#CD5C5C";
                        displayTaskObj.titleBgColor = "#F08080";
                        displayTaskObj.infoBgColor = "#FA8072";
                        bgButtonColor = "#FA8072";
                        break;
                    //保留
                    case HOLD_STATUS:
                        displayTaskObj.bdColor = "#FFFF00";
                        displayTaskObj.titleBgColor = "#FFFF66";
                        displayTaskObj.infoBgColor = "#FFFF66";
                        bgButtonColor = "#FFFF66";
                        break;
                    default:
                        break;
                }
            }
            //完了したタスク
            if (status === COMP_STATUS) {
                displayTaskObj.bdColor = "#808080";
                displayTaskObj.titleBgColor = "#808080";
                displayTaskObj.infoBgColor = "#808080";
                bgButtonColor = "#808080";
            }
            //対応中
            else if (status === WORKING_STATUS) {
                displayTaskObj.bdColor = "#33FFFF";
                displayTaskObj.titleBgColor = "#66FFFF";
                displayTaskObj.infoBgColor = "#66FFCC";
                bgButtonColor = "#66FFCC";
            }
        }

        //画面に表示するオブジェクトを作成
        taskContentSetting.forEach((item) => {
            //タスクリスト内に設定に一致するプロパティが存在しない場合は画面に表示しない
            if (!element[item.id]) {
                return;
            }
            //ID
            if (item.id === "id") {
                displayTaskObj.id = element[item.id];
                return;
            }
            //タイトル
            if (item.id === "title") {
                displayTaskObj.title = element[item.id];
                return;
            }
            //非表示項目
            if (item.isHidden) {
                return;
            }

            //選択項目
            if (item.listKey) {
                //汎用詳細リストからリストキーに一致する要素を抽出する
                let selectList = generalDataList.filter((list) => {
                    return list.id === item.listKey;
                });
                let isMatchPriority = false;
                selectList.some((list) => {
                    //値の一致する名称を取得
                    if (list.value === element[item.id]) {
                        element[item.id] = list.label;
                        return isMatchPriority = true;
                    }
                });
                //結合できなかった要素は画面に表示しない
                if (!isMatchPriority) {
                    return;
                }
            }

            if ((typeof element[item.id]) !== "string") {
                return;
            }

            let tmp = element[item.id] as string;
            //日付項目
            if (item.type === "date") {
                tmp = parseStrDate(tmp);
            }
            //コンテンツにデータを追加
            displayTaskObj.content.push({
                label: item.name,
                value: tmp
            });
        });

        //タイトルクリック時に詳細画面に遷移する
        displayTaskObj.onClickTitle = () => {
            moveTaskDetail(displayTaskObj.id);
        };

        //編集ボタン
        displayTaskObj["editButton"] = <ButtonComponent
            styleTypeNumber={"BASE"}
            bgColor={bgButtonColor}
            title={"詳細"}
            onclick={() => { openModal(element.id); }} />;

        tmpDisplayTaskList.push(displayTaskObj);
    });

    return tmpDisplayTaskList;
}

/**
 * タスクの詳細リストを作成
 * @param taskSettingList 
 * @param updTask 
 * @param generalDataList 
 * @param customAttributeInputSetting 
 * @returns 
 */
export function createTaskViewList(taskSettingList: inputTaskSettingType[], updTask: apiTaskDetailType,
    generalDataList: generalDataType[]
): displayTaskType {

    let tmpViewTaskList: viewTaskType[] = [];
    let tmpViewCustomAttributeList: viewTaskType[] = [];

    taskSettingList.forEach((element) => {
        let tmpValue: string = "";

        //項目の表示非表示
        if (element.isHidden) {
            return;
        }
        //カスタム属性をセット
        if (element.id === "customAttribute") {
            if (!updTask?.customAttribute) {
                return;
            }
            tmpViewCustomAttributeList = createCustomAttributeViewList(updTask.customAttribute);
            return;
        }

        for (const [columnKey, value] of Object.entries(updTask?.default as {})) {
            //キーの一致する要素を取り出す
            if (element.id === columnKey) {
                tmpValue = value as string;
                break;
            }
        }

        let tmpSelectLits: comboType[] = [];
        //リストキーが存在する(選択項目)
        if (element.listKey && generalDataList) {
            //汎用詳細から対応するリストを抽出
            tmpSelectLits = generalDataList.filter((item) => {
                return item.id === element.listKey;
            });
            //valueに一致する要素を抽出
            let matchList = tmpSelectLits.filter((item) => {
                return item.value === tmpValue;
            });
            //labelを「/」区切りで結合
            tmpValue = matchList.map((item) => {
                return item.label;
            }).join("/");
        }
        tmpViewTaskList.push({
            title: element.name,
            value: tmpValue,
        });
    });

    return {
        default: tmpViewTaskList,
        customAttribute: tmpViewCustomAttributeList,
    }
}

/**
 * リクエスト時の入力チェック
 * @param refInfoArray 
 * @returns 
 */
export function checkTaskRequest(refInfoArray: editDisplayTaskType) {
    //入力チェック
    let inputCheckObj = requestBodyInputCheck(refInfoArray.default);
    //入力チェック(カスタム属性)
    let customInputCheckObj = requestBodyInputCheck(refInfoArray.customAttribute);

    return {
        errFlg: inputCheckObj.errFlg || customInputCheckObj.errFlg,
        refInfoArray: {
            default: inputCheckObj.refInfoArray,
            customAttribute: customInputCheckObj.refInfoArray,
        }
    }
}


/**
 * タスクのリクエストボディを作成
 * @param refInfoArray 
 * @returns 
 */
export function createTaskRequestBody(refInfoArray: editDisplayTaskType)
    : taskRequestBodyType {
    //デフォルト
    let defBody: bodyObj = createRequestBody(refInfoArray.default);
    //カスタム属性
    let customBody: customAttributeRequestBodyType[] = createTaskCustomAttributeRequestBody(refInfoArray.customAttribute);

    return {
        default: defBody,
        customAttribute: customBody
    };
}
