import { RefObject } from "react"

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
    length: number,
    disabled: boolean,
    visible: boolean,
    value: string,
    selectList?: comboType[],
    description?: string,
    isRequired?: boolean,
    errMessage?: string,
    ref: RefObject<refType>,
}

//inputのタイプ
export type inputType = "input" | "select" | "radio" | "date" | "textarea" | "checkbox" | "number" | "label";

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
    description?: string,
    isRequired?: boolean,
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

//検索条件リストの型
export type searchConditionType = {
    task: taskSearchConditionType[]
}

//検索条件リストの型(タスク)
export type taskSearchConditionType = {
    id: string,
    name: string,
    type: inputType,
    listKey?: string,
    length: number,
    value: string,
    isHidden: boolean,
}

//検索条件の参照
export type refConditionType = {
    id: string,
    name: string,
    type: inputType,
    value: string,
    selectList?: comboType[],
    ref: RefObject<refType>,
}

//リクエストボディのチェック結果
export type refInputCheckType = {
    refInfoArray: refInfoType[],
    errFlg: boolean,
}

//ルーティング用
export type jsxObjType = {
    [key: string]: JSX.Element
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}