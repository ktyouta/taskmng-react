import { RefObject } from "react"
import { inputType, refType } from "../../Common/Type/CommonType"

//カスタム属性の型
export type customAttributeType = {
    id: string,
    name: string,
    description: string,
    type: string,
    required: boolean,
}

//入力欄参照用の型
export type inputRefType = {
    value: string,
    ref: RefObject<refType>,
}
