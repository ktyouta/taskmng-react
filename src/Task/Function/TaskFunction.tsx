import React, { SetStateAction } from "react";
import { bodyObj, comboType, generalDataType, refInfoType, userInfoType } from "../../Common/Type/CommonType";
import {
    apiTaskDetailType,
    customAttributeListType,
    customAttributeRequestBodyType,
    displayTaskType,
    editDisplayTaskType,
    inputTaskSettingType,
    taskContentDisplayType,
    taskContentSettingType,
    taskListType,
    taskRequestBodyType,
    taskSearchConditionRefType,
    taskSearchConditionType,
    viewTaskType
} from "../Type/TaskType";
import { ReactNode, createRef } from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import { createRequestBody, getNowDate, parseStrDate, requestBodyInputCheck, objectDeepCopy } from "../../Common/Function/Function";
import ButtonComponent from "../../Common/ButtonComponent";
import styled from "styled-components";
import { tabType } from "../../Common/TabComponent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import TaskEditForm from "../TaskEditForm";
import { COMP_STATUS, COMP_STATUS_BACKCOLOR, COMP_STATUS_BODERCOLOR, DEFAULT_STATUS_BACKCOLOR, DEFAULT_STATUS_BODERCOLOR, DELETE_BBACKCOLOR, DELETE_BODERCOLOR, HOLD_STATUS, HOLD_STATUS_BACKCOLOR, HOLD_STATUS_BODERCOLOR, NOCOMP_STATUS, NOCOMP_STATUS_BACKCOLOR, NOCOMP_STATUS_BODERCOLOR, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, WORKING_STATUS, WORKING_STATUS_BACKCOLOR, WORKING_STATUS_BODERCOLOR } from "../Const/TaskConst";
import { FLG, USER_AUTH } from "../../Common/Const/CommonConst";
import { IoNewspaperOutline } from "react-icons/io5";
import IconComponent from "../../Common/IconComponent";

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
            element.selectList &&
                element.selectList.length > 0 &&
                element.selectList[0].value &&
                element.selectList.unshift({
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
    generalDataList: generalDataType[], customAttributeInputSetting: refInfoType[], taskAuthority: string
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

        //入力値の種類
        let elementType = element.type;
        //編集可能フラグ
        let isEditable = element.isEditableOther || taskAuthority === USER_AUTH.ADMIN;

        //他ユーザーが編集不可の項目(管理者ユーザーの場合は編集可能)
        if (!isEditable) {
            elementType = "label";

            //選択リストの場合はlabelを取得する
            if (tmpSelectLits && tmpSelectLits.length > 0) {

                tmpValue = tmpSelectLits.find((element1) => {
                    return element1.value === tmpValue;
                })?.label;
            }
        }

        tmpRefInfoArray.push({
            id: element.id,
            name: element.name,
            type: elementType,
            length: element.length,
            //キーに一致するデータが存在する場合はその値を表示
            initValue: tmpValue ?? element.initValue,
            //閲覧モードの場合は全項目編集不可
            disabled: element.disabled,
            visible: isVisible,
            selectList: tmpSelectLits,
            description: element.description,
            isRequired: element.isRequired && isEditable,
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
    }
): taskSearchConditionRefType {

    let tmpSearchConditionRef: taskSearchConditionRefType = {
        default: [],
        custom: []
    }

    taskSearchConditionList.forEach((element) => {
        let tmpValue: string | undefined = undefined;
        for (const [columnKey, value] of Object.entries(searchConditionObj as {})) {
            //キーの一致する要素を取り出す
            if (element.id === columnKey) {
                tmpValue = value as string;
                break;
            }
        }

        switch (element.attribute) {
            //デフォルト属性
            case SEARCHCONDITION_KEY_DEFAULT:
                tmpSearchConditionRef.default.push({
                    id: element.id,
                    name: element.name,
                    type: element.type,
                    //キーに一致するデータが存在する場合はその値を表示
                    initValue: tmpValue ?? element.value,
                    selectList: element.selectList,
                    ref: createRef(),
                    length: element.length,
                    disabled: false,
                    visible: !element.isHidden,
                });
                break;
            //カスタム属性
            case SEARCHCONDITION_KEY_CUSTOM:
                tmpSearchConditionRef.custom.push({
                    id: element.id,
                    name: element.name,
                    type: element.type,
                    //キーに一致するデータが存在する場合はその値を表示
                    initValue: tmpValue ?? element.value,
                    selectList: element.selectList,
                    ref: createRef(),
                    length: element.length,
                    disabled: false,
                    visible: !element.isHidden,
                });
                break;
        }
    });

    return tmpSearchConditionRef;
}


/**
 * タスク新規追加画面のrefリストを作成
 * @param taskSearchConditionList 
 * @param searchConditionObj 
 * @param generalDataList 
 * @returns 
 */
export function createSettingSearchRefArray(taskSearchConditionList: taskSearchConditionType[],
): taskSearchConditionRefType {

    let tmpSearchConditionRef: taskSearchConditionRefType = {
        default: [],
        custom: []
    }

    taskSearchConditionList.forEach((element) => {
        switch (element.attribute) {
            //デフォルト属性
            case SEARCHCONDITION_KEY_DEFAULT:
                tmpSearchConditionRef.default.push({
                    id: element.id,
                    name: element.name,
                    type: element.type,
                    initValue: element.value,
                    selectList: element.selectList,
                    ref: createRef(),
                    length: element.length,
                    disabled: false,
                    visible: !element.isHidden,
                });
                break;
            //カスタム属性
            case SEARCHCONDITION_KEY_CUSTOM:
                tmpSearchConditionRef.custom.push({
                    id: element.id,
                    name: element.name,
                    type: element.type,
                    initValue: element.value,
                    selectList: element.selectList,
                    ref: createRef(),
                    length: element.length,
                    disabled: false,
                    visible: !element.isHidden,
                });
                break;
        }
    });

    return tmpSearchConditionRef;
}

/**
 * タスクの検索条件domを作成
 * @param taskSearchConditionList 選択条件の設定リスト
 * @param searchConditionObj 現在の選択条件
 * @param generalDataList 
 * @returns 
 */
export function createSearchDispCondition(taskSearchConditionList: taskSearchConditionType[],
    searchConditionObj: {
        [key: string]: string;
    }
): ReactNode[] {

    let tmpDisplayList: ReactNode[] = [];

    Object.keys(searchConditionObj).forEach((key) => {
        let value = searchConditionObj[key];
        if (!searchConditionObj[key]) {
            return true;
        }

        taskSearchConditionList.some((item) => {
            if (key !== item.id) {
                return;
            }

            //値がセットされている検索条件
            //複数選択項目
            if (item.selectList && item.selectList.length > 0) {
                value = "";
                let valArray = searchConditionObj[key].split(",");
                //選択値に対応したラベルを取得
                valArray.forEach((val) => {
                    item.selectList.some((list) => {
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
        });
    });

    return tmpDisplayList;
}

/**
 * タスクのコンテンツリストを作成
 * @param taskList 
 * @param openModal 
 * @param moveTaskDetail 
 * @returns 
 */
export function createTaskContentList(taskList: taskListType[],
    openModal: (id: string) => void,
    moveTaskDetail: (taskId: string) => void,
    onIcon: (id: string) => void,
    leaveIcon: () => void
): taskContentDisplayType[] {

    let tmpDisplayTaskList: taskContentDisplayType[] = [];
    //現在日時
    const nowDate = getNowDate(new Date());
    //タスクのディープコピー
    const tmpTaskList: taskListType[] = objectDeepCopy(taskList);

    //設定値をもとに画面に表示する項目を作成
    tmpTaskList.forEach((element: taskListType) => {
        //画面表示用タスク
        let displayTaskObj: taskContentDisplayType = {
            bdColor: undefined,
            titleBgColor: undefined,
            infoBgColor: undefined,
            editButton: <></>,
            taskContent: element,
            onClickTitle: () => { },
        };

        //タスクの状態に応じて背景色を変える
        //ステータス
        let status = element["status"];
        //期限
        let limitTime = element["limitTime"];

        //ステータスが存在する場合
        if (status) {
            //期限切れのタスク
            if (limitTime && limitTime < nowDate) {
                switch (status) {
                    //未対応
                    case NOCOMP_STATUS:
                        displayTaskObj.bdColor = NOCOMP_STATUS_BODERCOLOR;
                        displayTaskObj.titleBgColor = NOCOMP_STATUS_BACKCOLOR;
                        displayTaskObj.infoBgColor = NOCOMP_STATUS_BACKCOLOR;
                        break;
                    //保留
                    case HOLD_STATUS:
                        displayTaskObj.bdColor = HOLD_STATUS_BODERCOLOR;
                        displayTaskObj.titleBgColor = HOLD_STATUS_BACKCOLOR;
                        displayTaskObj.infoBgColor = HOLD_STATUS_BACKCOLOR;
                        break;
                    default:
                        break;
                }
            }
            //完了したタスク
            if (status === COMP_STATUS) {
                displayTaskObj.bdColor = COMP_STATUS_BODERCOLOR;
                displayTaskObj.titleBgColor = COMP_STATUS_BACKCOLOR;
                displayTaskObj.infoBgColor = COMP_STATUS_BACKCOLOR;
            }
            //対応中
            else if (status === WORKING_STATUS) {
                displayTaskObj.bdColor = WORKING_STATUS_BODERCOLOR;
                displayTaskObj.titleBgColor = WORKING_STATUS_BACKCOLOR;
                displayTaskObj.infoBgColor = WORKING_STATUS_BACKCOLOR;
            }
        }

        //削除済みタスク
        if (element.deleteFlg === FLG.ON) {
            displayTaskObj.bdColor = DELETE_BODERCOLOR;
            displayTaskObj.titleBgColor = DELETE_BBACKCOLOR;
            displayTaskObj.infoBgColor = DELETE_BBACKCOLOR;
        }

        //タイトルクリック時に詳細画面に遷移する
        displayTaskObj.onClickTitle = () => {
            moveTaskDetail(element.id);
        };

        //詳細モーダル表示用アイコン
        displayTaskObj.editButton = <IconComponent
            icon={IoNewspaperOutline}
            onclick={() => { openModal(element.id); }}
            style={{
                "width": "2.7em",
                "height": "2em"
            }}
            onMouseEnter={() => { onIcon(element.id) }}
            onMouseLeave={leaveIcon}
        />

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

/**
 * 検索条件画面に表示するタブのコンテンツを作成
 */
export function createTabItems(taskSearchRefInfo: taskSearchConditionRefType) {
    let tmpTabItemList: tabType[] = [];

    Object.keys(taskSearchRefInfo).forEach((objKey) => {

        //タブ内に表示するコンテンツ
        let tmpComponent: ReactNode =
            <React.Fragment>
                <VerticalSpaceComponent
                    space={'3%'}
                />
                <TaskEditForm
                    refInfoArray={taskSearchRefInfo[objKey]}
                    outerHeight='auto'
                />
            </React.Fragment>

        let tmpTitle = "";
        let tmpKey = "";
        switch (objKey) {
            case SEARCHCONDITION_KEY_DEFAULT:
                tmpTitle = "デフォルト属性";
                tmpKey = SEARCHCONDITION_KEY_DEFAULT;
                break;
            case SEARCHCONDITION_KEY_CUSTOM:
                tmpTitle = "カスタム属性";
                tmpKey = SEARCHCONDITION_KEY_CUSTOM;
                break;
        }

        tmpTabItemList.push({
            key: tmpKey,
            title: tmpTitle,
            children: tmpComponent
        });
    });

    return tmpTabItemList;
}


/**
 * クエリストリングからオブジェクトを作成
 * @returns 
 */
export function getUrlQueryObj(queryStrParam: string) {
    let queryStr = queryStrParam.slice(1);  // 文頭?を除外
    let queries: { [key: string]: string } = {};

    // クエリがない場合
    if (!queryStr) {
        return queries;
    }

    // クエリ文字列を & で分割して処理
    queryStr.split('&').forEach((queryStr) => {
        // = で分割してkey,valueをオブジェクトに格納
        let queryArr = queryStr.split('=');
        if (!queryArr || queryArr.length < 2) {
            return;
        }

        queries[queryArr[0]] = decodeURI(queryArr[1]);
    });

    return queries;
}


/**
 * タスクの削除可能チェック
 * @param userId ユーザーID
 * @param userId ユーザー権限
 * @param taskCreateUserId タスク作成ユーザーID
 */
export function checkTaskDeletable(
    userId: string,
    userAuth: string,
    taskCreateUserId: string
) {

    //権限ごとにフラグを返却
    switch (userAuth) {
        //一般
        case USER_AUTH.PUBLIC:
            return userId === taskCreateUserId;
        //専用
        case USER_AUTH.MASTER:
            return userId === taskCreateUserId;
        //管理者
        case USER_AUTH.ADMIN:
            return true;
        default:
            return false;
    }
}


/**
 * タスクの復元可能チェック
 * @param userInfo 
 * @param taskCreateUserId 
 */
export function checkTaskRecoverable(userInfo: userInfoType) {

    return parseInt(userInfo.auth) >= parseInt(USER_AUTH.ADMIN);
}