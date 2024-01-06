import { inputType } from "../../../Type/type";

//デフォルト属性の型
export type defaultAttributeType = {
    [key: string]: string | string[] | boolean | undefined,
    id: string,
    name: string,
    type: inputType,
    required: boolean,
    selectElementList?: string[],
    selectElementListId: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    description: string,
    length: string,
}
