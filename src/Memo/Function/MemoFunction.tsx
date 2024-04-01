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
import { COMP_STATUS, HOLD_STATUS, MEMO_STATUS, NOCOMP_STATUS, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, WORKING_STATUS } from "../Const/MemoConst";


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
    //メモのディープコピー
    const tmpMemoList: memoListType[] = JSON.parse(JSON.stringify(memoList));

    //設定値をもとに画面に表示する項目を作成
    tmpMemoList.forEach(element => {
        //画面表示用メモ
        let displayMemoObj: memoContentDisplayType = {
            id: "",
            title: "",
            content: [],
            onClickTitle: () => { },
        };

        //下書きの場合は背景色を変える
        if (element.status === MEMO_STATUS.draft) {
            displayMemoObj.bdColor = "#66FFFF";
            // displayMemoObj.titleBgColor = "#66FFFF";
            // displayMemoObj.infoBgColor = "#66FFCC";
        }

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