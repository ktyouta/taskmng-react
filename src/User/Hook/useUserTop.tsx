import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useReducer, useState } from "react";
import { editModeAtom, userIdAtom } from "../../Setting/SettingUser/Atom/SettingUserAtom";
import useQueryWrapper, { errResType } from "../../Common/Hook/useQueryWrapper";
import { buttonObjType, generalDataType } from "../../Common/Type/CommonType";
import { reqAuthReqType, updUserType, userType } from "../../Setting/SettingUser/Type/SettingUserType";
import { radioType } from "../../Common/LabelRadioListComponent";
import { editModeEnum } from "../../Setting/Const/SettingConst";
import { AUTH_ID, SELECT_ICON_TYPE } from "../../Setting/SettingUser/Const/SettingUserConst";
import useMutationWrapper, { resType } from "../../Common/Hook/useMutationWrapper";
import ENV from '../../env.json';
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { HOME_PATH, NOWPATH_STRAGEKEY } from "../../Header/Const/HeaderConst";
import useSettingUserEdit from "../../Setting/SettingUser/Hook/useSettingUserEdit";
import { userInfoAtom } from "../../Content/Atom/ContentAtom";
import { userInfoAuthorityAtom } from "../Atom/UserAtom";
import { USERINFO_ACTION_TYPE } from "../Const/UserConst";
import { updateUserData } from "../Function/UserFunction";
import { isCorrectIconType } from "../../Setting/SettingUser/Function/SettingUserFunction";
import { updUserReqType } from "../Type/UserType";
import { checkAuthAction } from "../../Common/Function/Function";
import { USER_AUTH } from "../../Common/Const/CommonConst";



function useUserTop() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //ユーザーID
    const userId = useAtomValue(userIdAtom);
    //ユーザー画面の権限
    const userInfoAuthority = useAtomValue(userInfoAuthorityAtom);
    //ユーザーの権限入力リスト
    const [inputUserAuthList, setInputUserAuthList] = useState<reqAuthReqType[]>([]);


    //入力欄のユーザー情報
    const [userDatas, userDatasDisptch] = useReducer(updateUserData, {});

    //編集画面遷移時に更新用データを取得
    const { data: updUser, isLoading: isLoadinGetuser } = useQueryWrapper<userType>(
        {
            url: userId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.USERINFO}/${userId}` : ``,
            //取得したデータをセット
            afSuccessFn: (data) => {
                if (!data) {
                    return;
                }

                userDatasDisptch({ type: USERINFO_ACTION_TYPE.ID, payload: data.userId });
                userDatasDisptch({ type: USERINFO_ACTION_TYPE.NAME, payload: data.userName });
                userDatasDisptch({ type: USERINFO_ACTION_TYPE.PASS, payload: data.password });
                userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_TYPE, payload: data.iconType });

                if (data.iconUrl) {
                    userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_URL, payload: data.iconUrl });
                }

                setInputUserAuthList(data.authList);
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                alert(tmp.response.data.errMessage);

                //ローカルストレージから遷移前の画面のパスを取得する
                let nowPath = localStorage.getItem(NOWPATH_STRAGEKEY);
                if (!nowPath) {
                    nowPath = HOME_PATH;
                }

                navigate(nowPath);
                return;
            }
        }
    );


    //現在ユーザー情報に設定されているアイコンのURL
    let orgIconUrl = useMemo(() => {
        return updUser && updUser.iconUrl ? updUser.iconUrl : "";
    }, [updUser]);

    //ユーザー情報取得時の権限情報
    let orgAuthList = useMemo(() => {
        return updUser && updUser.authList ? updUser.authList : [];
    }, [updUser]);


    //初期値セット
    useEffect(() => {

        //新規登録
        if (editMode === editModeEnum.create) {
            userDatasDisptch({ type: USERINFO_ACTION_TYPE.NAME, payload: "" });
            userDatasDisptch({ type: USERINFO_ACTION_TYPE.PASS, payload: "" });
            userDatasDisptch({ type: USERINFO_ACTION_TYPE.ID, payload: "" });
            userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_TYPE, payload: SELECT_ICON_TYPE.NO_SELECT });
            return;
        }

    }, []);


    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.USERINFO}/${userId}`,
        method: "PUT",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });


    /**
     * 更新イベント
     */
    const updateAttribute = () => {

        //ユーザー情報画面権限チェック
        if (!checkAuthAction(userInfoAuthority, USER_AUTH.PUBLIC)) {
            alert("ユーザー情報画面の権限が不足しているため更新できません。");
            return;
        }

        let body = createRequestBody();
        if (!body) {
            return;
        }
        if (!window.confirm('ユーザーを更新しますか？')) {
            return
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        updMutation.mutate(body);
    }


    /**
     * リクエストボディの作成
     */
    const createRequestBody = () => {
        let body: updUserReqType = {
            userName: "",
            password: "",
            iconType: userDatas.iconType ?? "",
            iconUrl: "",
        };

        //名称
        if (!userDatas.userName) {
            alert("ユーザー名を入力してください");
            return;
        }
        body.userName = userDatas.userName;

        //パスワード
        if (!userDatas.password) {
            alert("パスワードを入力してください");
            return;
        }
        body.password = userDatas.password;

        //アイコン
        if (!isCorrectIconType(userDatas.iconType)) {
            alert("アイコン設定の選択値が不正です。");
            return;
        }

        switch (userDatas.iconType) {
            case SELECT_ICON_TYPE.NO_SELECT:
                break;
            case SELECT_ICON_TYPE.STANDARD:
                if (!userDatas.iconUrl && !orgIconUrl) {
                    alert("アイコンを設定してください。");
                    return;
                }
                body.iconUrl = userDatas.iconUrl ? userDatas.iconUrl : orgIconUrl ? orgIconUrl : "";
                break;
            case SELECT_ICON_TYPE.ORIGINAL:
                if (!userDatas.iconUrl && !orgIconUrl) {
                    alert("アイコンを設定してください。");
                    return;
                }
                body.iconUrl = userDatas.iconUrl ? userDatas.iconUrl : orgIconUrl ? orgIconUrl : "";
                break;
        }

        return body;
    };


    /**
     * 戻るイベント
     */
    const backPage = () => {
        //ローカルストレージから遷移前の画面のパスを取得する
        let nowPath = localStorage.getItem(NOWPATH_STRAGEKEY);
        if (!nowPath) {
            //遷移前のパスが取得できなかった場合はホーム画面に遷移する
            nowPath = HOME_PATH;
        }
        navigate(nowPath);
    }

    return {
        userId,
        orgIconUrl,
        isLoadinGetuser,
        backPage,
        updateAttribute,
        positiveButtonObj: {
            title: '戻る',
            type: "GRAD_GRAY",
            onclick: backPage
        } as buttonObjType,
        runButtonObj: {
            title: "更新",
            type: "GRAD_BLUE",
            onclick: updateAttribute
        } as buttonObjType,
        editMode,
        isUpdLoading: updMutation.isLoading,
        userDatas,
        userDatasDisptch,
        inputUserAuthList,
        setInputUserAuthList,
        orgAuthList,
    }
}

export default useUserTop;