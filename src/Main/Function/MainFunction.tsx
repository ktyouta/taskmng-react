import React from "react";
import { menuListType, userInfoType } from "../../Common/Type/CommonType";
import { ScreenTestIdPrefix } from "../../tests/AppTest/DataTestId";
import Home from "../../Home/Home";
import Master from "../../Master/Master";
import AddMaster from "../../AddMaster/AddMaster";
import Task from "../../Task/Task";
import Memo from "../../Memo/Memo";
import Setting from "../../Setting/Setting";
import User from "../../User/User";
import Histroy from "../../History/Histroy";
import SettingCustom from "../../Setting/SettingCustom/SettingCustom";
import SettingCategory from "../../Setting/SettingCategory/SettingCategory";
import SettingUser from "../../Setting/SettingUser/SettingUser";
import SettingDefault from "../../Setting/SettingDefault/SettingDefault";
import SettingSearchCondition from "../../Setting/SettingSearchCondition/SettingSearchCondition";
import { getUserAuth } from "../../Common/Function/Function";
import { CATEGORY_ID } from "../../Common/Const/CommonConst";

/**
 * 設定から該当のコンポーネントを返す
 * @param componentName 
 * @param url 
 * @returns 
 */
export function retComponent(element: menuListType) {

    let component;
    //画面のパス
    let path = element.path;
    //テスト用ID
    let testId = `${ScreenTestIdPrefix}${element.id}`;

    switch (element.id) {
        //ホーム
        case CATEGORY_ID.HOME:
            component = <Home
                testId={testId}
            />;
            break;
        //マスタ編集
        case CATEGORY_ID.MASTER_EDIT:
            component = <Master
                testId={testId}
            />;
            break;
        //新規マスタ追加
        case CATEGORY_ID.ADD_MASTER:
            component = <AddMaster
                testId={testId}
            />;
            break;
        //タスク
        case CATEGORY_ID.TASK:
            component = <Task
                path={path}
                testId={testId}
                menuId={element.id}
            />;
            break;
        //メモ
        case CATEGORY_ID.MEMO:
            component = <Memo
                path={path}
                testId={testId}
                menuId={element.id}
            />;
            break;
        //設定
        case CATEGORY_ID.SETTING:
            component = <Setting
                path={path}
                testId={testId}
                subMenuList={element.subCategoryList ?? []}
            />;
            break;
        //ユーザーメニュー
        case CATEGORY_ID.USER:
            component = <User
                path={path}
                testId={testId}
                menuId={element.id}
            />;
            break;
        //作業履歴
        case CATEGORY_ID.HISTORY:
            component = <Histroy
                testId={testId}
            />
            break;
    }

    return component;
};