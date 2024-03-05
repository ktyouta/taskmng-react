//リクエストボディのタイプ
export type bodyObj = {
    [prop: string]: any
}

//メソッドタイプ
export type methodType = "POST" | "PUT" | "DELETE"

//汎用詳細の型
export type generalDetailType = {
    id: string,
    value: string,
    label: string,
}

//ラベルと値の型
export type comboType = {
    label: string,
    value: string,
}

//入力欄参照用の型
export type inputSettingType = {
    id: string,
    name: string,
    type: inputType,
    length: string,
    disabled: boolean,
    visible: boolean,
    value: string,
    selectList?: comboType[],
    description?: string,
    isRequired?: boolean,
    errMessage?: string,
}

//inputのタイプ
export type inputType = "input" | "select" | "radio" | "date" | "textarea" | "checkbox" | "number" | "label" | "";