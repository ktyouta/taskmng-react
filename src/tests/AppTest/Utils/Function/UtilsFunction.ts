import CATEGORY_INFO from '../../../../../public/json/setting/menu.json';
import { menuListType } from "../../../../Common/Type/CommonType";
import { retComponent } from '../../../../Main/Function/MainFunction';
import { authInfo } from "../../TestDatas";

/**
 * クッキーのリセット
 */
export function clearCookies() {
    // 現在のクッキーを取得
    const cookies = document.cookie.split(';');

    // 各クッキーを削除するための設定
    cookies.forEach((cookie) => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}

/**
 * カテゴリIDからコンポーネントを取得する
 */
export function getCategoryComponentList(categoryId: string) {

    let category = CATEGORY_INFO.find((element: menuListType) => {
        //パラメータのIDからカテゴリ情報を取得
        return element.id === categoryId;
    });

    if (!category) {
        fail("カテゴリIDからカテゴリ情報を取得できませんでした。カテゴリIDを確認してください。");
    }

    //カテゴリ情報からコンポーネントを取得
    let component = retComponent(category);

    if (!component) {
        fail(`画面のコンポーネントを取得できませんでした。MainFunction.tsxのretComponentを確認してください。`);
    }

    return component;
}