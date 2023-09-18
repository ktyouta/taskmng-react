import { RefObject } from "react"
import { inputType, refType } from "../../Common/Type/CommonType"


//入力欄参照用の型
export type inputRefType = {
    value: string,
    ref: RefObject<refType>,
}
