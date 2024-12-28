import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useReducer, useRef, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { buttonObjType, generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";
import { buttonType } from "../../../Common/ButtonComponent";
import { reqAuthReqType, updUserType, userInputType, userType } from "../Type/SettingUserType";
import { editModeAtom, settingUserAuthorityAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";
import { AUTH_ID, SELECT_ICON_TYPE, USERINFO_ACTION_TYPE } from "../Const/SettingUserConst";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { USER_AUTH } from "../../../Common/Const/CommonConst";
import { checkUpdAuthList, isCorrectIconType, updateUserData } from "../Function/SettingUserFunction";
import { HOME_PATH, NOWPATH_STRAGEKEY } from "../../../Header/Const/HeaderConst";
import { userInfoAtom } from "../../../Content/Atom/ContentAtom";
import { authType } from "../../../Common/Hook/useCheckAuth";
import { checkAuthAction } from "../../../Common/Function/Function";


//引数の型
type propsType = {
    path: string,
}

function useSettingUserEdit(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //ユーザーID
    const userId = useAtomValue(userIdAtom);
    //ログインユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);
    //ユーザー画面の権限
    const settingUserAuthority = useAtomValue(settingUserAuthorityAtom);
    //ユーザーの権限入力リスト
    const [inputUserAuthList, setInputUserAuthList] = useState<reqAuthReqType[]>([]);


    //入力欄のユーザー情報
    const [userDatas, userDatasDisptch] = useReducer(updateUserData, {});

    //編集画面遷移時に更新用データを取得
    const { data: updUser, isLoading: isLoadinGetuser } = useQueryWrapper<userType>(
        {
            url: userId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGUSER}/${userId}` : ``,
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

    //登録日
    let registerTime = useMemo(() => {
        return updUser && updUser.registerTime ? updUser.registerTime : "";
    }, [updUser]);

    //更新日
    let updTime = useMemo(() => {
        return updUser && updUser.updTime ? updUser.updTime : "";
    }, [updUser]);

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

    //URLを直打ちした際にカスタム画面トップに遷移させる
    useEffect(() => {
        //モード未選択状態
        if (editMode === editModeEnum.noselect) {
            navigate(`${props.path}`);
        }
    }, []);

    //登録用フック
    const registMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGUSER}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            //メッセージを表示してマスタトップ画面に遷移する
            navigate(`${props.path}`);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGUSER}/${userId}`,
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

    //削除用フック
    const delMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGUSER}/${userId}`,
        method: "DELETE",
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
        navigate(`${props.path}`);
    };

    /**
     * 登録イベント
     */
    const registeAttribute = () => {
        let body = createRequestBody();
        if (!body) {
            return;
        }
        if (!window.confirm('ユーザーを登録しますか？')) {
            return
        }
        if (!registMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        registMutation.mutate(body);
    }

    /**
     * 更新イベント
     */
    const updateAttribute = () => {
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
     * 削除イベント
     */
    const deleteAttribute = () => {
        if (!window.confirm('ユーザーを削除しますか？')) {
            return
        }
        delMutation.mutate();
    }

    /**
     * リクエストボディの作成
     */
    const createRequestBody = () => {
        let body: updUserType = {
            userId: "",
            userName: "",
            password: "",
            iconType: userDatas.iconType ?? "",
            iconUrl: "",
            authList: [],
        };

        //ID
        if (!userDatas.userId) {
            alert("IDを入力してください");
            return;
        }
        body.userId = userDatas.userId;

        //名称
        if (!userDatas.userName) {
            alert("名称を入力してください");
            return;
        }
        body.userName = userDatas.userName;

        //パスワード
        if (!userDatas.password) {
            alert("パスワードを入力してください");
            return;
        }
        body.password = userDatas.password;

        //権限
        if (checkUpdAuthList(inputUserAuthList)) {
            alert("最低1画面は「一般」以上の権限を設定してください。");
            return;
        }
        body.authList = inputUserAuthList;

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


    return {
        userId,
        registerTime,
        orgIconUrl,
        updTime,
        isLoadinGetuser,
        backPage,
        registeAttribute,
        updateAttribute,
        deleteAttribute,
        buttonTitle,
        positiveButtonObj: {
            title: '戻る',
            type: "GRAD_GRAY",
            onclick: backPage
        } as buttonObjType,
        deleteButtonObj: {
            title: "削除",
            type: "GRAD_RED",
            onclick: editMode === editModeEnum.update ? deleteAttribute : undefined
        } as buttonObjType,
        runButtonObj: {
            title: buttonTitle,
            type: "GRAD_BLUE",
            onclick: editMode === editModeEnum.update ? updateAttribute : registeAttribute
        } as buttonObjType,
        editMode,
        isEditable: userId === userInfo?.userId || checkAuthAction(settingUserAuthority, USER_AUTH.ADMIN),
        isUpdLoading: registMutation.isLoading || updMutation.isLoading || delMutation.isLoading,
        userDatas,
        userDatasDisptch,
        inputUserAuthList,
        setInputUserAuthList,
        orgAuthList,
    }
}

export default useSettingUserEdit;