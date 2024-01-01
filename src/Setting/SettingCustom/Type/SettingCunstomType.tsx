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
