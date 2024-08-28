import { menuListType } from "../../Common/Type/CommonType";

//取得したカテゴリをフィルターする
export function filterCategoryInfo(menu: menuListType[], userAuth: number) {

    //ログインユーザーの権限と非表示メニューでルーティングを切り替える
    return menu.filter((element) => {

        //ログインユーザーの権限フィルター
        if (parseInt(element.auth) > userAuth) {
            return false;
        }

        //非表示メニュー
        if (element.isHidden === "1") {
            return false;
        }

        return true;
    });
}