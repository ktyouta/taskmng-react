import { customAttributeType } from "../../../Type/type"

//カスタム属性の登録用データの作成時の返却用の型
export type retCreateAddCustomAttributeType = {
    customAttributeId: string,
    registData: customAttributeType[]
}