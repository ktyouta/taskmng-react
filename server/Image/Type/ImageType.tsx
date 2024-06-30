//画像リストの画面返却用の型
export type imageListResType = {
    [key: string]: string,
    id: string,
    name: string,
    type: string,
    deleteFlg: string,
    url: string,
}

//画像リスト読み込み時の型
export type imageListType = {
    id: string,
    name: string,
    type: string,
    deleteFlg: string
}