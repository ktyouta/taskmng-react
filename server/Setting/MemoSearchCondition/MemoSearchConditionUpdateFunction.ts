import { FLG } from "../../Common/Const/CommonConst";
import { checkAuthAction, getNowDate } from "../../Common/Function";
import { memoPrivateSearchConditionType, memoSearchConditionListType, settingMemoSearchConditionUpdType, settingPrivateMemoSearchConditionUpdReqType } from "./Type/MemoSearchConditionType";

/**
 * 検索条件設定リスト(ユーザー単位)の更新用データの作成
 */
export function createUpdPrivateMemoSearchConditionList(
    privateSearchConditionList: memoPrivateSearchConditionType[],
    body: settingPrivateMemoSearchConditionUpdReqType,
    userId: string): memoPrivateSearchConditionType[] {

    //現在日付を取得
    const nowDate = getNowDate();
    //追加用の検索条件
    let addSearchConditionList: memoPrivateSearchConditionType[] = [];

    body.condition.forEach((element: settingMemoSearchConditionUpdType) => {

        //現在のユーザーの検索条件リストから更新対象のオブジェクトを取得
        let privateSearchCondition = privateSearchConditionList.find((element1: memoPrivateSearchConditionType) => {

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
