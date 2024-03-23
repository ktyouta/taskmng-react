import React, { SetStateAction } from "react";
import { bodyObj, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import {
    apiMemoDetailType,
    customAttributeListType,
    customAttributeRequestBodyType,
    displayMemoType,
    editDisplayMemoType,
    inputMemoSettingType,
    memoContentDisplayType,
    memoContentSettingType,
    memoListType,
    memoRequestBodyType,
    memoSearchConditionRefType,
    memoSearchConditionType,
    viewMemoType
} from "../Type/MemoType";
import { ReactNode, createRef } from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import { createRequestBody, getNowDate, parseStrDate, requestBodyInputCheck } from "../../Common/Function/Function";
import ButtonComponent from "../../Common/ButtonComponent";
import styled from "styled-components";
import { tabType } from "../../Common/TabComponent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import MemoEditForm from "../MemoEditForm";
import { COMP_STATUS, HOLD_STATUS, NOCOMP_STATUS, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, WORKING_STATUS } from "../Const/MemoConst";


//フッターのスタイル
const MemoConditionItemDiv = styled.div`
    display: flex;
    align-items: center;
`;

const MemoSearchAreaDt = styled.dt`
    height: 100%;
    width: auto;
    align-items: center;
`;


/**
 * 画面表示用のカスタム属性リストを作成
 * @param customAttribute APIから取得したカスタム属性リスト
 * @returns 
 */
export function createCustomAttributeViewList(customAttribute: customAttributeListType[]): viewMemoType[] {
    let tmpViewCustomAttributeList: viewMemoType[] = [];

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
export function createMemoCustomAttributeRequestBody(refInputArray: refInfoType[]): customAttributeRequestBodyType[] {
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
 * メモ編集画面のrefリストを作成
 * @param memoSettingList 
 * @param updMemo 
 * @param generalDataList 
 * @param customAttributeInputSetting 
 * @returns 
 */
// export function createUpdRefArray(memoSettingList: inputMemoSettingType[], updMemo: apiMemoDetailType,
//     generalDataList: generalDataType[], customAttributeInputSetting: refInfoType[]
// ): editDisplayMemoType {

//     let tmpRefInfoArray: refInfoType[] = [];
//     let tmpEditCustomAttributeList: refInfoType[] = [];

//     memoSettingList.forEach((element) => {
//         let tmpValue: string | undefined = undefined;

//         //カスタム属性をセット
//         if (element.id === "customAttribute") {
//             if (!updMemo?.customAttribute) {
//                 return;
//             }
//             tmpEditCustomAttributeList = createCunstomAttributeEditList(updMemo.customAttribute, customAttributeInputSetting);
//             return;
//         }

//         for (const [columnKey, value] of Object.entries(updMemo?.default as {})) {
//             //キーの一致する要素を取り出す
//             if (element.id === columnKey) {
//                 tmpValue = value as string;
//                 break;
//             }
//         }
//         let isVisible = true;
//         let tmpSelectLits: comboType[] = [];
//         //項目の表示非表示
//         if (element.isHidden) {
//             isVisible = false;
//         }
//         //リストキーが存在する(選択項目)
//         if (element.listKey && generalDataList) {
//             tmpSelectLits = generalDataList.filter((item) => {
//                 return item.id === element.listKey;
//             });
//         }
//         tmpRefInfoArray.push({
//             id: element.id,
//             name: element.name,
//             type: element.type,
//             length: element.length,
//             //キーに一致するデータが存在する場合はその値を表示
//             initValue: tmpValue ?? element.initValue,
//             //閲覧モードの場合は全項目編集不可
//             disabled: element.disabled,
//             visible: isVisible,
//             selectList: tmpSelectLits,
//             description: element.description,
//             isRequired: element.isRequired,
//             ref: createRef(),
//         });
//     });

//     return {
//         default: tmpRefInfoArray,
//         customAttribute: tmpEditCustomAttributeList,
//     }
// }

/**
 * メモ新規追加画面のrefリストを作成
 * @param memoSettingList 
 * @param generalDataList 
 * @param customAttributeInputSetting 
 * @returns 
 */
export function createRegistRefArray(memoSettingList: inputMemoSettingType[],
    generalDataList: generalDataType[], customAttributeInputSetting: refInfoType[]
): editDisplayMemoType {

    let tmpRefInfoArray: refInfoType[] = [];
    let tmpEditCustomAttributeList: refInfoType[] = [];

    memoSettingList.forEach((element) => {
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
 * メモ新規追加画面のrefリストを作成
 * @param memoSearchConditionList 
 * @param searchConditionObj 
 * @param generalDataList 
 * @returns 
 */
export function createSearchRefArray(memoSearchConditionList: memoSearchConditionType[],
    searchConditionObj: {
        [key: string]: string;
    }
): memoSearchConditionRefType {

    let tmpSearchConditionRef: memoSearchConditionRefType = {
        default: [],
        custom: []
    }

    memoSearchConditionList.forEach((element) => {
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
 * メモ新規追加画面のrefリストを作成
 * @param memoSearchConditionList 
 * @param searchConditionObj 
 * @param generalDataList 
 * @returns 
 */
export function createSettingSearchRefArray(memoSearchConditionList: memoSearchConditionType[],
): memoSearchConditionRefType {

    let tmpSearchConditionRef: memoSearchConditionRefType = {
        default: [],
        custom: []
    }

    memoSearchConditionList.forEach((element) => {
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
 * メモの検索条件domを作成
 * @param memoSearchConditionList 選択条件の設定リスト
 * @param searchConditionObj 現在の選択条件
 * @param generalDataList 
 * @returns 
 */
export function createSearchDispCondition(memoSearchConditionList: memoSearchConditionType[],
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

        memoSearchConditionList.some((item) => {
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
                    <MemoConditionItemDiv>
                        <MemoSearchAreaDt>{`[${item.name}]：`}</MemoSearchAreaDt>
                        <MemoSearchAreaDt>{`${value}`}</MemoSearchAreaDt>
                    </MemoConditionItemDiv>
                    <SpaceComponent space={"3%"} />
                </React.Fragment>
            );
            return true;
        });
    });

    return tmpDisplayList;
}

/**
 * メモのコンテンツリストを作成
 * @param memoList 
 * @param generalDataList 
 * @param memoContentSetting 
 * @param openModal 
 * @param moveMemoDetail 
 * @returns 
 */
export function createMemoContentList(memoList: memoListType[],
    memoContentSetting: memoContentSettingType[],
    moveMemoDetail: (memoId: string) => void
): memoContentDisplayType[] {

    let tmpDisplayMemoList: memoContentDisplayType[] = [];
    //現在日時
    const nowDate = getNowDate(new Date());
    //メモのディープコピー
    const tmpMemoList: memoListType[] = JSON.parse(JSON.stringify(memoList));

    //設定値をもとに画面に表示する項目を作成
    tmpMemoList.forEach(element => {
        //画面表示用メモ
        let displayMemoObj: memoContentDisplayType = {
            id: "",
            title: "",
            bdColor: undefined,
            titleBgColor: undefined,
            infoBgColor: undefined,
            editButton: <></>,
            content: [],
            onClickTitle: () => { },
        };

        //画面に表示するオブジェクトを作成
        memoContentSetting.forEach((item) => {
            //メモリスト内に設定に一致するプロパティが存在しない場合は画面に表示しない
            if (!element[item.id]) {
                return;
            }
            //ID
            if (item.id === "id") {
                displayMemoObj.id = element[item.id];
                return;
            }
            //タイトル
            if (item.id === "title") {
                displayMemoObj.title = element[item.id];
                return;
            }
            //非表示項目
            if (item.isHidden) {
                return;
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
            displayMemoObj.content.push({
                label: item.name,
                value: tmp
            });
        });

        //タイトルクリック時に詳細画面に遷移する
        displayMemoObj.onClickTitle = () => {
            moveMemoDetail(displayMemoObj.id);
        };

        tmpDisplayMemoList.push(displayMemoObj);
    });

    return tmpDisplayMemoList;
}

/**
 * メモの詳細リストを作成
 * @param memoSettingList 
 * @param updMemo 
 * @param generalDataList 
 * @param customAttributeInputSetting 
 * @returns 
 */
// export function createMemoViewList(memoSettingList: inputMemoSettingType[], updMemo: apiMemoDetailType,
//     generalDataList: generalDataType[]
// ): displayMemoType {

//     let tmpViewMemoList: viewMemoType[] = [];
//     let tmpViewCustomAttributeList: viewMemoType[] = [];

//     memoSettingList.forEach((element) => {
//         let tmpValue: string = "";

//         //項目の表示非表示
//         if (element.isHidden) {
//             return;
//         }
//         //カスタム属性をセット
//         if (element.id === "customAttribute") {
//             if (!updMemo?.customAttribute) {
//                 return;
//             }
//             tmpViewCustomAttributeList = createCustomAttributeViewList(updMemo.customAttribute);
//             return;
//         }

//         for (const [columnKey, value] of Object.entries(updMemo?.default as {})) {
//             //キーの一致する要素を取り出す
//             if (element.id === columnKey) {
//                 tmpValue = value as string;
//                 break;
//             }
//         }

//         let tmpSelectLits: comboType[] = [];
//         //リストキーが存在する(選択項目)
//         if (element.listKey && generalDataList) {
//             //汎用詳細から対応するリストを抽出
//             tmpSelectLits = generalDataList.filter((item) => {
//                 return item.id === element.listKey;
//             });
//             //valueに一致する要素を抽出
//             let matchList = tmpSelectLits.filter((item) => {
//                 return item.value === tmpValue;
//             });
//             //labelを「/」区切りで結合
//             tmpValue = matchList.map((item) => {
//                 return item.label;
//             }).join("/");
//         }
//         tmpViewMemoList.push({
//             title: element.name,
//             value: tmpValue,
//         });
//     });

//     return {
//         default: tmpViewMemoList,
//         customAttribute: tmpViewCustomAttributeList,
//     }
// }

/**
 * リクエスト時の入力チェック
 * @param refInfoArray 
 * @returns 
 */
export function checkMemoRequest(refInfoArray: editDisplayMemoType) {
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
 * メモのリクエストボディを作成
 * @param refInfoArray 
 * @returns 
 */
export function createMemoRequestBody(refInfoArray: editDisplayMemoType)
    : memoRequestBodyType {
    //デフォルト
    let defBody: bodyObj = createRequestBody(refInfoArray.default);
    //カスタム属性
    let customBody: customAttributeRequestBodyType[] = createMemoCustomAttributeRequestBody(refInfoArray.customAttribute);

    return {
        default: defBody,
        customAttribute: customBody
    };
}

/**
 * 検索条件画面に表示するタブのコンテンツを作成
 */
export function createTabItems(memoSearchRefInfo: memoSearchConditionRefType) {
    let tmpTabItemList: tabType[] = [];

    Object.keys(memoSearchRefInfo).forEach((objKey) => {

        //タブ内に表示するコンテンツ
        let tmpComponent: ReactNode =
            <React.Fragment>
                <VerticalSpaceComponent
                    space={'3%'}
                />
                {/* <MemoEditForm /> */}
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