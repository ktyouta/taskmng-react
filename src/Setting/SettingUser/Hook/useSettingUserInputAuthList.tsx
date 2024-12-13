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
import { objectDeepCopy } from "../../../Common/Function/Function";


//引数の型
type propsType = {
    closeFn?: () => void,
    inputUserAuthList: authType[],
    setInputUserAuthList: React.Dispatch<React.SetStateAction<authType[]>>,
    orgAuthList: authType[],
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

            let tmpPrevState = objectDeepCopy(prevState);

            //権限を切り替えたメニューオブジェクトを取得
            let selectStateObj = tmpPrevState.find((element) => {
                return element.menuId === menuId;
            });

            //選択した権限をセットする
            if (selectStateObj) {
                selectStateObj.auth = selectValue;
            }

            return tmpPrevState;
        });
    };

    /**
     * 権限情報をリセットする
     */
    const resetAuthList = () => {

        if (!authLabelList || authLabelList.length === 0) {
            return;
        }

        //リセット確認
        if (!window.confirm("権限情報をリセットしますか？")) {
            return;
        }

        //APIから取得したユーザーの権限情報をもとに権限をリセットする
        setSelectAuthList((prevState: selectAuthType[]) => {

            let tmpPrevState = objectDeepCopy(prevState).map((element: selectAuthType) => {

                let authObj = props.orgAuthList.find((element1: authType) => {
                    return element1.menuId === element.menuId;
                });

                let auth;

                //APIから取得した権限情報リスト内に存在する要素
                if (authObj) {
                    auth = authObj.auth;
                }
                else {
                    auth = authLabelList[0].value;
                }

                return {
                    menuId: element.menuId,
                    menuName: element.menuName,
                    auth: auth,
                    userId: element.userId,
                    authLabelList: element.authLabelList,
                    parentMenuId: element.parentMenuId,
                    isContainSubMenu: element.isContainSubMenu,
                }
            });

            return tmpPrevState;
        });
    };

    return {
        selectAuthList,
        settingAuthInputInfo,
        changeAuthCombo,
        resetAuthList,
    }
}

export default useSettingUserInputAuthList;
