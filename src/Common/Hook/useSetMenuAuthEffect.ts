import { WritableAtom } from 'jotai';
import React, { SetStateAction, useEffect, useState } from 'react';
import { authType } from './useCheckAuth';
import { getUserAuth } from '../Function/Function';


//引数の型
type propsType = {
    setter: (arg: SetStateAction<string>) => void,
    authList: authType[],
    menuId: string,
}

/**
 * ユーザーの対象画面に対する権限をセットする
 * @param props 
 */
function useSetMenuAuthEffect(props: propsType) {

    useEffect(() => {

        if (!props.authList) {
            return;
        }

        //画面IDから権限を取得
        let userAuth = getUserAuth(props.authList, props.menuId);

        //対象画面の権限取得に失敗した場合
        if (!userAuth) {
            return;
        }

        //jotaiのsetterに権限をセットする
        props.setter(userAuth);

    }, [props.authList]);

}

export default useSetMenuAuthEffect;