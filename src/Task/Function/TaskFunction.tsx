import { comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import { apiTaskDetailType, customAttributeListType, customAttributeRequestBodyType, editDisplayTaskType, inputTaskSettingType, viewTaskType } from "../Type/TaskType";
import { createRef } from "react";

/**
 * 画面表示用のカスタム属性リストを作成
 * @param customAttribute APIから取得したカスタム属性リスト
 * @returns 
 */
export function createCunstomAttributeViewList(customAttribute: customAttributeListType[]): viewTaskType[] {
    let tmpViewCustomAttributeList: viewTaskType[] = [];

    customAttribute.forEach((element) => {
        let tmp = element.value;
        let list = element.selectList;

        //選択形式の場合は名称を取得する
        if (list && list.length > 0) {

            //複数選択可能形式(チェックボックス)の場合
            if (tmp.includes(",")) {
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

        let tmp = element.value;
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
            if (tmp.includes(",")) {
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
            value: tmp,
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
            value: element.value,
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
        let postValue: string | undefined = element.value;
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
 * @param taskSettingList タスクの設定リスト
 * @param updTask タスク詳細
 * @param generalDataList 汎用詳細リスト
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
            value: tmpValue ?? element.value,
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
