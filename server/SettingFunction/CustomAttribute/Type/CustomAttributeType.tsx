import { customAttributeType } from "../../../Type/type"

//カスタム属性の登録用データの作成時の返却用の型
export type retCreateAddCustomAttributeType = {
    customAttributeId: string,
    registDatas: customAttributeType[],
    errMessage: string,
}

//カスタム属性の更新用データの作成時の返却用の型
export type retCreateUpdCustomAttributeType = {
    updDatas: customAttributeType[],
    errMessage: string,
}