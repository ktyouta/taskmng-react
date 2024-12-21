import { authInfoType } from "../../Auth/Type/AuthType";
import { FLG } from "../../Common/Const/CommonConst";
import { getNowDate } from "../../Common/Function";
import { searchConditionType, settingPrivateSearchConditionUpdReqType, settingSearchConditionUpdReqType, settingSearchConditionUpdType, taskPrivateSearchConditionType } from "./Type/SearchConditionType";

/**
 * 検索条件設定の更新用データの作成
 */
export function createUpdSearchCondition(searchConditionList: searchConditionType[], body: searchConditionType, id: string,
    authResult: authInfoType) {

    //更新データ
    let updData = searchConditionList.find((element) => {
        return element.id === id;
    });

    if (!updData) {
        return searchConditionList;
    }

    //現在日付を取得
    const nowDate = getNowDate();

    updData.attribute = body.attribute;
    updData.listKey = body.listKey;
    updData.name = body.name;
    updData.type = body.type;
    updData.value = body.value;
    updData.auth = body.auth;
    updData.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    updData.updTime = nowDate;
    updData.deleteFlg = "0";

    return searchConditionList;
}


/**
 * 検索条件設定リストの更新用データの作成
 */
export function createUpdSearchConditionList(searchConditionList: searchConditionType[], body: settingSearchConditionUpdReqType,
    authResult: authInfoType) {

    //現在日付を取得
    const nowDate = getNowDate();

    body.condition.forEach((element) => {
        let searchCondition = searchConditionList.find((element1) => {
            return element.id === element1.id;
        });

        if (!searchCondition) {
            return;
        }

        //IDに一致するデータを更新
        searchCondition.value = element.value;
        searchCondition.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
        searchCondition.updTime = nowDate;
    });

    return searchConditionList;
}


/**
 * 検索条件設定リスト(ユーザー単位)の更新用データの作成
 */
export function createUpdPrivateSearchConditionList(
    privateSearchConditionList: taskPrivateSearchConditionType[],
    body: settingPrivateSearchConditionUpdReqType,
    userId: string) {

    //現在日付を取得
    const nowDate = getNowDate();
    //追加用の検索条件
    let addSearchConditionList: taskPrivateSearchConditionType[] = [];

    body.condition.forEach((element: settingSearchConditionUpdType) => {

        //ユーザーの検索条件オブジェクトを取得
        let privateSearchCondition = privateSearchConditionList.find((element1: taskPrivateSearchConditionType) => {

            return element.id === element1.id && element1.userId === userId;
        });

        //現在のユーザーの検索条件に存在しない場合は追加する
        if (!privateSearchCondition) {
            addSearchConditionList = [...addSearchConditionList, {
                id: element.id,
                value: element.value,
                registerTime: nowDate,
                updTime: nowDate,
                deleteFlg: FLG.OFF,
                userId: userId,
            }];

            return;
        }

        //IDに一致する検索条件を更新
        privateSearchCondition.value = element.value;
        privateSearchCondition.updTime = nowDate;
    });

    //追加の検索条件をセット
    privateSearchConditionList = [...privateSearchConditionList, ...addSearchConditionList];

    return privateSearchConditionList;
}