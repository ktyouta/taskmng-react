import { inputType } from "../../../Type/type";

//デフォルト属性の型
export type defaultAttributeType = {
    [key: string]: string | string[] | boolean | number | undefined,
    id: string,
    name: string,
    type: inputType,
    isRequired: boolean,
    selectElementList?: string[],
    selectElementListId: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    description: string,
    length: string,
    isNewCreateVisible: boolean,
    isHidden: boolean,
}

//デフォルト属性の更新時の型
export type defaultAttributeUpdType = {
    [key: string]: string | string[] | boolean | number | undefined,
    name: string,
    description: string,
    isRequired: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    length: number,
}