//デフォルト属性の型
export type defaultAttributeType = {
    id: string,
    name: string,
    description: string,
    type: string,
    isRequired: boolean,
    registerTime?: string,
    updTime?: string,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    length: number,
}

//デフォルト属性の更新時の型
export type defaultAttributeUpdType = {
    name: string,
    description: string,
    isRequired: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    length: number,
}