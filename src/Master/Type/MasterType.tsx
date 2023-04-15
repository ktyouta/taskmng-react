import { RefObject } from "react"
import { refType } from "../../Common/BaseInputComponent"

//マスタ編集画面の入力欄の設定
export type inputSettingType = {
    id: string,
    name: string,
    type: string,
    length: number,
    value: string,
    isEditable: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
}

//入力欄参照用の型
export type refInfoType = {
    id: string,
    name: string,
    type: string,
    lenght: number,
    editFlg: boolean,
    visible: boolean,
    value: string,
    ref: RefObject<refType>,
}
