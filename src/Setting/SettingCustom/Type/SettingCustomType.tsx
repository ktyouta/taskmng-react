//カスタム属性の型
export type customAttributeType = {
    id: string,
    name: string,
    description: string,
    type: string,
    required: boolean,
    selectElementList: string[],
    registerTime?: string,
    updTime?: string,
}

//サーバーから受け取るカスタム属性詳細の型
export type resClientCustomAttributeType = {
    id: string,
    name: string,
    type: string,
    required: boolean,
    selectElementList?: selectElementListType[],
    selectElementListId: string,
    registerTime: string,
    updTime: string,
    userId: string,
    description: string,
    auth: string,
}

//カスタム属性選択リストの型
export type selectElementListType = {
    no: string,
    value: string,
}

//登録更新リクエスト用のカスタム属性の型
export type updCustomAttributeType = {
    id: string,
    name: string,
    description: string,
    type: string,
    required: boolean,
    selectElementList: selectElementListType[],
}