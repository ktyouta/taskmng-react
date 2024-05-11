import { createRef } from "react";
import { refInfoType } from "../../../Common/Type/CommonType";
import { memoSearchConditionType } from "../../../Memo/Type/MemoType";

/**
 * メモ新規追加画面のrefリストを作成
 * @param memoSearchConditionList 
 * @param searchConditionObj 
 * @param generalDataList 
 * @returns 
 */
export function createMemoSearchRefArray(memoSearchConditionList: memoSearchConditionType[],): refInfoType[] {

    return memoSearchConditionList.map((element) => {

        return {
            id: element.id,
            name: element.name,
            type: element.type,
            //キーに一致するデータが存在する場合はその値を表示
            initValue: element.value,
            selectList: element.selectList,
            ref: createRef(),
            length: element.length,
            disabled: false,
            visible: !element.isHidden,
            description: element.description
        }
    });;
}