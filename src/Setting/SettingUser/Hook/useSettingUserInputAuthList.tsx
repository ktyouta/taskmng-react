import { useEffect, useMemo, useState } from "react";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { generalDataType, menuListType } from "../../../Common/Type/CommonType";
import ENV from '../../../env.json';
import { authType } from "../../../Common/Hook/useCheckAuth";
import useGetGeneralDataList from "../../../Common/Hook/useGetGeneralDataList";
import { AUTH_ID } from "../Const/SettingUserConst";
import { editModeEnum } from "../../Const/SettingConst";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../Atom/SettingUserAtom";
import { getInputAuthObjList } from "../Function/SettingUserFunction";


//引数の型
type propsType = {
    closeFn?: () => void,
    inputUserAuthList: authType[],
    setInputUserAuthList: React.Dispatch<React.SetStateAction<authType[]>>
}

//権限設定画面の権限リストの型
export type selectAuthType = {
    menuId: string,
    menuName: string,
    auth: string,
    userId: string,
    authLabelList: generalDataType[],
    parentMenuId: string,
    isContainSubMenu: boolean,
}


function useSettingUserInputAuthList(props: propsType) {

    //権限の選択値
    const [selectAuthList, setSelectAuthList] = useState<selectAuthType[]>([]);
    //ユーザーID
    const userId = useAtomValue(userIdAtom);

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

        if (!props.inputUserAuthList) {
            return;
        }

        //入力用の権限情報リストを作成する
        let tmpSelectAuthList: selectAuthType[] = getInputAuthObjList(
            menuList,
            props.inputUserAuthList,
            authLabelList,
            userId,
            ""
        );

        setSelectAuthList(tmpSelectAuthList);

    }, [menuList, authLabelList]);


    //選択した権限をセットする
    const settingAuthInputInfo = () => {

        //画面の入力値をセットする
        props.setInputUserAuthList(
            selectAuthList.map((element: selectAuthType) => {
                return {
                    menuId: element.menuId,
                    userId: element.userId,
                    auth: element.auth
                }
            })
        );

        if (props.closeFn) {
            props.closeFn();
        }
    };


    /**
     * 権限のコンボボックスの切り替え処理
     * @param selectValue 
     * @param menuId 
     */
    const changeAuthCombo = (selectValue: string, menuId: string,) => {

        setSelectAuthList((prevState: selectAuthType[]) => {

            let selectState = prevState.find((element) => {
                return element.menuId === menuId;
            });

            //選択した権限をセットする
            if (selectState) {
                selectState.auth = selectValue;
            }

            return prevState;
        });
    };

    return {
        selectAuthList,
        settingAuthInputInfo,
        changeAuthCombo,
    }
}

export default useSettingUserInputAuthList;
