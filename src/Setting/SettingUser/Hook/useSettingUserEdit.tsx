import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { buttonObjType, generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";
import { buttonType } from "../../../Common/ButtonComponent";
import { updUserType, userType } from "../Type/SettingUserType";
import { editModeAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";
import { AUTH_ID, SELECT_ICON_TYPE } from "../Const/SettingUserConst";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userInfoAtom } from "../../../Content/Hook/useContentLogic";
import { USER_AUTH } from "../../../Common/Const/CommonConst";
import { isCorrectIconType } from "../Function/SettingUserFunction";


//引数の型
type propsType = {
    path: string,
}

function useSettingUserEdit(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ユーザーID
    const userId = useAtomValue(userIdAtom);
    // ログインユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    //汎用詳細リスト(形式選択)
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //ID
    const [id, setId] = useState<string | undefined>();
    //名称
    const [userName, setUserName] = useState<string | undefined>();
    //パスワード
    const [password, setPassword] = useState<string | undefined>();
    //権限
    const [auth, setAuth] = useState<string | undefined>();
    //アイコン
    const [iconUrl, setIconUrl] = useState<string | undefined>();
    //アイコン選択
    const [iconType, setIconType] = useState<string | undefined>();
    //現在設定されているアイコン
    const [orgIconUlr, setOrgIconUrl] = useState<string | undefined>();

    //編集画面遷移時に更新用データを取得
    const { data: updUser, isLoading: isLoadinGetuser } = useQueryWrapper<userType>(
        {
            url: userId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGUSER}/${userId}` : ``,
            //取得したデータをセット
            afSuccessFn: (data) => {
                setErrMessage("");
                if (!data) {
                    return;
                }
                setId(data.userId);
                setUserName(data.userName);
                setPassword(data.password);
                setAuth(data.auth);
                setIconType(data.iconUrl ? SELECT_ICON_TYPE.STANDARD : SELECT_ICON_TYPE.NO_SELECT);
                setOrgIconUrl(data.iconUrl);
                if (data.iconUrl) {
                    setIconUrl(data.iconUrl);
                }
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                setErrMessage(tmp.response.data.errMessage);
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

    //権限リスト
    const authList = useMemo(() => {
        if (!generalDataList) {
            return;
        }
        let tmp: radioType[] = generalDataList.filter((element) => {
            return element.id === AUTH_ID;
        }).map((element) => {
            return { label: element.label, value: element.value }
        });

        //新規登録の場合は先頭の値をセット
        if (editMode === editModeEnum.create && tmp.length > 0) {
            setAuth(tmp[0].value);
        }
        return tmp;
    }, [generalDataList]);

    //初期値セット
    useEffect(() => {
        //新規登録
        if (editMode === editModeEnum.create) {
            setUserName("");
            setPassword("");
            setId("");
            setAuth("");
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
        if (!registMutation) {
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
            auth: "",
            iconType: iconType ?? "",
            iconUrl: "",
        };

        //ID
        if (!id) {
            alert("IDを入力してください");
            return;
        }
        body.userId = id;

        //名称
        if (!userName) {
            alert("名称を入力してください");
            return;
        }
        body.userName = userName;

        //パスワード
        if (!password) {
            alert("パスワードを入力してください");
            return;
        }
        body.password = password;

        //権限
        if (!auth) {
            alert("権限を入力してください");
            return;
        }
        body.auth = auth;

        //アイコン
        if (!isCorrectIconType(iconType)) {
            alert("アイコン設定の選択値が不正です。");
            return;
        }

        switch (iconType) {
            case SELECT_ICON_TYPE.NO_SELECT:
                break;
            case SELECT_ICON_TYPE.STANDARD:
                if (!iconUrl && !orgIconUlr) {
                    alert("アイコンを設定してください。");
                    return;
                }
                body.iconUrl = iconUrl ? iconUrl : orgIconUlr ? orgIconUlr : "";
                break;
            case SELECT_ICON_TYPE.ORIGINAL:
                if (!iconUrl && !orgIconUlr) {
                    alert("アイコンを設定してください。");
                    return;
                }
                body.iconUrl = iconUrl ? iconUrl : orgIconUlr ? orgIconUlr : "";
                break;
        }

        return body;
    };

    return {
        userId,
        id,
        setId,
        userName,
        setUserName,
        password,
        setPassword,
        authList,
        auth,
        setAuth,
        registerTime,
        updTime,
        isLoadinGetuser,
        backPage,
        registeAttribute,
        updateAttribute,
        deleteAttribute,
        buttonTitle,
        positiveButtonObj: {
            title: '戻る',
            type: "BASE",
            onclick: backPage
        } as buttonObjType,
        deleteButtonObj: {
            title: "削除",
            type: "DANGER",
            onclick: editMode === editModeEnum.update ? deleteAttribute : undefined
        } as buttonObjType,
        runButtonObj: {
            title: buttonTitle,
            type: "RUN",
            onclick: editMode === editModeEnum.update ? updateAttribute : registeAttribute
        } as buttonObjType,
        editMode,
        iconUrl,
        setIconUrl,
        iconType,
        setIconType,
        isEditable: userId === userInfo?.userId || userInfo?.auth === USER_AUTH.ADMIN,
        orgIconUlr,
        isUpdLoading: registMutation.isLoading || updMutation.isLoading || delMutation.isLoading,
    }
}

export default useSettingUserEdit;