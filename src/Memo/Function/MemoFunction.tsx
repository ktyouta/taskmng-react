import React, { SetStateAction } from "react";
import { bodyObj, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import {
    memoContentDisplayType,
    memoListType,
    memoSearchConditionType,
    tagListResType,
} from "../Type/MemoType";
import { ReactNode, createRef } from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import { createRequestBody, getNowDate, getUrlQuery, parseStrDate, requestBodyInputCheck } from "../../Common/Function/Function";
import ButtonComponent from "../../Common/ButtonComponent";
import styled from "styled-components";
import { tabType } from "../../Common/TabComponent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import MemoEditForm from "../MemoEditForm";
import { COMP_STATUS, HOLD_STATUS, MEMO_SEARCH_URL, MEMO_STATUS, NOCOMP_STATUS, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, TAG_QUERY_KEY, WORKING_STATUS } from "../Const/MemoConst";
import TagButtonComponent from "../../Common/TagButtonComponent";
import { stringify } from "querystring";


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
    },
    selectedTagList: tagListResType[]
): refInfoType[] {

    let tmpSearchConditionRef: refInfoType[] = memoSearchConditionList.map((element) => {
        let tmpValue: string | undefined = undefined;
        for (const [columnKey, value] of Object.entries(searchConditionObj as {})) {
            //キーの一致する要素を取り出す
            if (element.id === columnKey) {
                tmpValue = value as string;
                break;
            }
        }

        //タグ
        if (element.id === TAG_QUERY_KEY) {
            tmpValue = selectedTagList.map((element) => {
                return element.label;
            }).join(" ");
        }

        return {
            id: element.id,
            name: element.name,
            type: element.type,
            //キーに一致するデータが存在する場合はその値を表示
            initValue: tmpValue ?? "",
            selectList: element.selectList,
            ref: createRef(),
            length: element.length,
            disabled: false,
            visible: !element.isHidden,
            description: element.description
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
export function createMemoContentList(memoList: memoListType[], moveMemoDetail: (memoId: string) => void,
    selectContentTag: (selectTag: tagListResType) => void
): memoContentDisplayType[] {

    let tmpDisplayMemoList: memoContentDisplayType[] = [];
    //メモのディープコピー
    const tmpMemoList: memoListType[] = JSON.parse(JSON.stringify(memoList));

    //設定値をもとに画面に表示する項目を作成
    tmpMemoList.forEach(element => {
        //画面表示用メモ
        let displayMemoObj: memoContentDisplayType = {
            id: element.id,
            title: element.title,
            content: element,
            onClickTitle: () => { },
            tagList: element.tagList.map((element) => {
                return {
                    ...element,
                    onClickTag: () => {
                        selectContentTag(element)
                    },
                }
            })
        };

        //下書きの場合は背景色を変える
        if (element.status === MEMO_STATUS.draft) {
            displayMemoObj.bdColor = "#33FFFF";
            displayMemoObj.bgColor = "#66FFFF";
            displayMemoObj.status = "下書き";
        }

        //タイトルクリック時に詳細画面に遷移する
        displayMemoObj.onClickTitle = () => {
            moveMemoDetail(element.id);
        };

        tmpDisplayMemoList.push(displayMemoObj);
    });

    return tmpDisplayMemoList;
}


/**
 * タグの表示用domを作成
 * @param memoSearchConditionList 選択条件の設定リスト
 * @param searchConditionObj 現在の選択条件
 * @param generalDataList 
 * @returns 
 */
export function createDisplayTagList(selectedTagList: tagListResType[],
    deleteTag: (selectTag: tagListResType) => void): ReactNode[] {

    let tmpDisplayList: ReactNode[] = selectedTagList.map((element) => {
        return (
            <React.Fragment>
                <TagButtonComponent
                    title={element.label}
                    onclick={() => { deleteTag(element) }}
                    isDispCross={true}
                />
                <SpaceComponent space={"3%"} />
            </React.Fragment>
        );
    });

    return tmpDisplayList;
}


/**
 * メモリスト検索用URLの作成
 * @param selectedTagList 
 * @param deleteTag 
 * @returns 
 */
export function createMemoSearchUrl(tmpUrl: string, searchConditionObj: {
    [key: string]: string;
}, selectedTagList: tagListResType[]) {

    let query = "?";

    //クエリストリング用のリストを作成
    let queryList = Object.keys(searchConditionObj).reduce((prev: string[], current: string) => {
        if (!searchConditionObj[current]) {
            return prev;
        }
        prev.push(`${current}=${searchConditionObj[current]}`);
        return prev;
    }, []);

    if (queryList.length > 0 || selectedTagList.length > 0) {
        tmpUrl += `${query}`;
    }

    if (queryList.length > 0) {
        tmpUrl += `${queryList.join("&")}`;
    }

    //タグが選択されている場合
    if (selectedTagList.length > 0) {
        tmpUrl += queryList.length > 0 ? "&" : "";
        tmpUrl += `${TAG_QUERY_KEY}=${selectedTagList.map((element) => `${element.label}`).join(",")}`;
    }

    return tmpUrl;
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

        if (queryArr[0] === TAG_QUERY_KEY) {
            return;
        }
        queries[queryArr[0]] = decodeURI(queryArr[1]);
    });

    return queries;
}


/**
 * クエリストリングからタグリストを作成
 * @returns 
 */
export function getUrlQueryTagList(queryStrParam: string): tagListResType[] {
    let queries: tagListResType[] = [];

    if (!queryStrParam) {
        return queries;
    }

    let queryStr = queryStrParam.slice(1);  // 文頭?を除外
    // クエリがない場合
    if (!queryStr) {
        return queries;
    }

    return queryStr.split('&').reduce((prev: tagListResType[], current: string) => {
        if (current.startsWith(`${TAG_QUERY_KEY}=`)) {
            let tagValue = current.substring(`${TAG_QUERY_KEY}=`.length);
            prev.push(...tagValue.split(",").map((element) => {
                return {
                    label: element,
                    value: "",
                }
            }))
        }

        return prev;
    }, []);
}


/**
 * 検索オブジェクトからクエリストリングを作成
 * @returns 
 */
export function getUrlQueryMemo(searchConditionObj: {
    [key: string]: string;
}, selectedTagList: tagListResType[]) {
    let query = "";

    //検索条件オブジェクト
    query = getUrlQuery(searchConditionObj);

    //タグ
    let tagStr = selectedTagList.map((element) => `${element.label}`).join(",");
    query += `${query.length > 0 && tagStr.length > 0 ? "&" : ""}${tagStr.length > 0 ? `${TAG_QUERY_KEY}=${tagStr}` : ``}`;

    return query;
}
