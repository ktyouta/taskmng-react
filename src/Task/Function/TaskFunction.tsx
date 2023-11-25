import { comboType, refInfoType } from "../../Common/Type/CommonType";
import { customAttributeListType, customAttributeRequestBodyType, viewTaskType } from "../Type/TaskType";
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
export function createCunstomAttributeEditList(customAttribute: customAttributeListType[]): refInfoType[] {
    let tmpEditCustomAttributeList: refInfoType[] = [];

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

        tmpEditCustomAttributeList.push({
            id: element.id,
            name: element.name,
            type: element.type,
            length: element.length,
            disabled: false,
            visible: true,
            value: element.value,
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
            customAttribute: element.id,
            selectedValue: postValue,
        });
    });
    return tmpBody;
}
