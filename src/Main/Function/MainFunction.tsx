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

/**
 * 設定から該当のコンポーネントを返す
 * @param componentName 
 * @param url 
 * @returns 
 */
export const retComponent = (element: menuListType, userInfo: userInfoType) => {

    let component;
    //画面のパス
    let path = element.path;
    //テスト用ID
    let testId = `${ScreenTestIdPrefix}${element.id}`;

    //画面IDから権限を取得
    let auth = getUserAuth(userInfo, element.id);

    //権限が存在しない
    if (!auth) {
        return component;
    }

    switch (element.componentName) {
        //ホーム
        case "Home":
            component = <Home
                testId={`${testId}`}
            />;
            break;
        //マスタ編集
        case "Master":
            component = <Master
                testId={`${testId}`} />;
            break;
        //新規マスタ追加
        case "AddMaster":
            component = <AddMaster
                testId={`${testId}`} />;
            break;
        //タスク
        case "Task":
            component = <Task
                path={path}
                testId={`${testId}`}
                auth={auth}
            />;
            break;
        //メモ
        case "Memo":
            component = <Memo
                path={path}
                testId={`${testId}`}
            />;
            break;
        //設定
        case "Setting":
            component = <Setting
                path={path}
                testId={`${testId}`}
                subMenuList={element.subCategoryList ?? []}
            />;
            break;
        //ユーザーメニュー
        case "User":
            component = <User
                path={path}
                testId={`${testId}`}
            />;
            break;
        //作業履歴
        case "History":
            component = <Histroy
                testId={`${testId}`}
            />
            break;
    }

    return component;
};