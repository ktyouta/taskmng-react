//画像リストの画面返却用の型
export type imageListResType = {
    [key: string]: string,
    id: string,
    imageName: string,
    imageType: string,
    deleteFlg: string,
    imageUrl: string,
}

//画像リスト読み込み時の型
export type imageListType = {
    id: string,
    imageName: string,
    imageType: string,
    deleteFlg: string
}