//カテゴリの型
export type categoryType = {
    id: string,
    name: string,
    path: string,
    componentName: string,
    auth: string,
    isHidden: string,
    order: string,
    registerTime: string,
    updTime: string,
}

//カテゴリの型(登録更新用)
export type registCategoryType = {
    name: string,
    path: string,
    componentName: string,
    auth: string,
    isHidden: string,
}