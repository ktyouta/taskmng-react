import { useEffect, useMemo, useState } from "react";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { generalDataType, menuListType } from "../../../Common/Type/CommonType";
import ENV from '../../../env.json';
import { authType } from "../../../Common/Hook/useCheckAuth";
import useGetGeneralDataList from "../../../Common/Hook/useGetGeneralDataList";
import { AUTH_ID } from "../Const/SettingUserConst";
import { editModeEnum } from "../../Const/SettingConst";


//引数の型
type propsType = {
    inputUserAuthList: authType[],
}

//権限設定画面の権限リストの型
type selectAuthType = {
    menuId: string,
    menuName: string,
    value: string,
    authLabelList: generalDataType[],
}


function useSettingUserInputAuthList(props: propsType) {

    //権限の選択値
    const [selectAuthList, setSelectAuthList] = useState<selectAuthType[]>([]);

    //メニューのリスト
    const { data: menuList } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`,
        }
    );

    //権限のラベルリスト
    const { generalDataList: authLabelList } = useGetGeneralDataList(AUTH_ID);

    //権限の選択値の作成
    useEffect(() => {

        if (!menuList) {
            return;
        }

        if (!authLabelList || authLabelList.length === 0) {
            return;
        }

        let tmpSelectAuthList: selectAuthType[] = menuList.map((element) => {

            //ユーザーの権限リストからメニューIDに一致するデータを取得する
            let userAuthObj = props.inputUserAuthList.find((element1) => {
                return element1.menuId === element.id;
            });

            let selectValue;

            //ユーザーの権限リストに存在する場合は権限リストの値を設定する
            if (userAuthObj) {
                selectValue = userAuthObj.auth;
            }
            //ユーザーの権限リストに存在しない場合は汎用詳細から取得したリストの先頭の値を設定する
            else {
                selectValue = authLabelList[0].value;
            }

            return {
                menuId: element.id,
                menuName: element.name,
                value: selectValue,
                authLabelList: authLabelList,
            }

        });

        setSelectAuthList(tmpSelectAuthList);

    }, [menuList, authLabelList]);


    return {
        selectAuthList
    }
}

export default useSettingUserInputAuthList;
