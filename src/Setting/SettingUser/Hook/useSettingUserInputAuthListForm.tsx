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



function useSettingUserInputAuthListForm() {

    //展開中の親メニューIDを格納するリスト
    const [selectMenuList, setSelectMenuList] = useState<string[]>([]);


    /**
     * 親メニューの開閉処理
     * @param menuId 
     */
    const openCloseParentMenu = (menuId: string,) => {

        setSelectMenuList((state: string[]) => {

            //既に展開中のメニューの場合はクローズする
            if (state.includes(menuId)) {

                state = state.filter((element) => {
                    return element !== menuId;
                });
            }
            else {
                state = [...state, menuId];
            }

            return state;
        });
    };

    return {
        selectMenuList,
        openCloseParentMenu
    }
}

export default useSettingUserInputAuthListForm;
