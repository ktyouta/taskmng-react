import { useAtomValue, useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { customAttributeType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";


function useSettingCustomEdit() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);

    //URLを直打ちした際にカスタム画面トップに遷移させる
    useEffect(() => {
        //モード未選択状態
        if (editMode === editModeEnum.noselect) {
            navigate(`/setting/custom`);
        }
    }, []);

    //登録更新メソッド
    let methodNm: "POST" | "PUT" | undefined = undefined;
    switch (editMode) {
        case editModeEnum.noselect:
            break;
        case editModeEnum.create:
            methodNm = "POST";
            break;
        case editModeEnum.update:
            methodNm = "PUT";
            break;
    };

    //登録更新用フック
    const mutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTING}${ENV.CUSTOM}`,
        method: methodNm,
        queryKey: [`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTING}${ENV.CUSTOM}
                    ${editMode === editModeEnum.update && customAttributeId ? "/" + customAttributeId : ""}`],
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            //メッセージを表示してマスタトップ画面に遷移する
            navigate(`/setting/custom`);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            setErrMessage(res.response.data.errMessage);
        },
    });

    /**
     * 実行ボタンタイトル
     */
    let buttonTitle = "";
    switch (editMode) {
        //閲覧
        case editModeEnum.noselect:
            break;
        //登録
        case editModeEnum.create:
            buttonTitle = "登録";
            break;
        //更新
        case editModeEnum.update:
            buttonTitle = "更新";
            break;
        default:
            break;
    }

    /**
     * 戻るイベント
     */
    const backPage = () => {
        navigate(`/setting/custom`);
    };

    /**
     * 登録イベント
     */
    const register = () => {

    }

    return {
        backPage,
        register,
        buttonTitle
    }
}

export default useSettingCustomEdit;