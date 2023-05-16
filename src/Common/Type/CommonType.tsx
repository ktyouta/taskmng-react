import { RefObject } from "react"
import { refType } from "../BaseInputComponent"

//画面に表示するテーブル
export type selectedMasterDataType = {
    id: string,
    name: string,
    remarks: string,
}

//テーブルボディの型
export type tableBodyType = {
    id: string,
    body: string[]
}

//カラムの設定リスト
export type masterColumnListType = {
    id: string,
    name: string,
    remarks: string,
}

//メニューのタイプ
export type menuType = {
    url: string,
    name: string,
    auth: string,
}

//リクエストボディのタイプ
export type bodyObj = {
    [prop: string]: any
}

//リクエスト用ユーザー情報
export type reqUserInfoType = {
    userId: string,
    password?: string,
}

//レスポンス用ユーザー情報
export type resUserInfoType = {
    userId: string,
    userName: string,
    auth: string,
}

//apiのレスポンス
export type apiResponseType = {
    status?: number,
    json?: {
        errMessage?: string,
        token?: string,
        userInfo?: {
            userId?: string,
            userName?: string,
            auth?: string,
        }
    }
}

//ユーザー情報
export type userInfoType = {
    userId: string,
    userName: string,
    auth: string,
}

//マスタのリスト
export type masterDataListType = {
    value: string,
    label: string,
    remarks: string,
    component?: JSX.Element,
};

//入力欄参照用の型
export type refInfoType = {
    id: string,
    name: string,
    type: inputType,
    lenght: number,
    disabled: boolean,
    visible: boolean,
    value: string,
    selectList?: comboType[],
    ref: RefObject<refType>,
}

//inputのタイプ
type inputType = "input" | "select" | "radio" | "date";

//マスタ編集画面の入力欄の設定
export type inputMasterSettingType = {
    id: string,
    name: string,
    type: inputType,
    length: number,
    value: string,
    disabled: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
}

//マスタ追加画面の入力欄の設定
export type inputAddMasterSettingType = {
    id: string,
    name: string,
    type: inputType,
    length: number,
    value: string,
    disabled: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
}

//タスク編集画面の入力欄の設定
export type inputTaskSettingType = {
    id: string,
    name: string,
    type: inputType,
    length: number,
    value: string,
    disabled: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    listKey?: string,
}


//入力欄設定
export type inputSettingType = {
    inputMasterSetting: inputMasterSettingType[],
    addMasterSummarySetting: inputAddMasterSettingType[],
    taskEditSetting: inputTaskSettingType[]
}

//汎用詳細データの型
export type generalDataType = {
    id: string,
    value: string,
    label: string,
}

//コンボボックスの型
export type comboType = {
    value: string,
    label: string
}  