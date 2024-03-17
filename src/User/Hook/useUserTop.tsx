import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import { editModeAtom, userIdAtom } from "../../Setting/SettingUser/Atom/SettingUserAtom";
import useQueryWrapper, { errResType } from "../../Common/Hook/useQueryWrapper";
import { buttonObjType, generalDataType } from "../../Common/Type/CommonType";
import { updUserType, userType } from "../../Setting/SettingUser/Type/SettingUserType";
import { radioType } from "../../Common/LabelRadioListComponent";
import { editModeEnum } from "../../Setting/Const/SettingConst";
import { AUTH_ID } from "../../Setting/SettingUser/Const/SettingUserConst";
import useMutationWrapper, { resType } from "../../Common/Hook/useMutationWrapper";
import ENV from '../../env.json';


//引数の型
type propsType = {
    path: string,
}

function useUserTop(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //カスタム属性のID
    const userId = useAtomValue(userIdAtom);
    //汎用詳細リスト(形式選択)
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //カスタム属性のパラメータ
    //ID
    const [id, setId] = useState<string | undefined>();
    //名称
    const [userName, setUserName] = useState<string | undefined>();
    //パスワード
    const [password, setPassword] = useState<string | undefined>();
    //権限
    const [auth, setAuth] = useState<string | undefined>();

    //編集画面遷移時に更新用データを取得
    const { data: updUser, isLoading: isLoadinGetuser } = useQueryWrapper<userType>(
        {
            url: userId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGUSER}/${userId}` : ``,
            //取得したデータをセット
            afSuccessFn: (data: userType) => {
                setErrMessage("");
                if (!data) {
                    return;
                }
                setId(data.userId);
                setUserName(data.userName);
                setPassword(data.password);
                setAuth(data.auth);
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


    /**
     * 実行ボタンタイトル
     */
    let buttonTitle = "";
    switch (editMode) {
        //更新
        case editModeEnum.update:
            buttonTitle = "更新";
            break;
        default:
            break;
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
     * リクエストボディの作成
     */
    const createRequestBody = () => {
        let body: updUserType = {
            userId: "",
            userName: "",
            password: "",
            auth: "",
            registerTime: "",
            updTime: ""
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
        updateAttribute,
        buttonTitle,
        runButtonObj: {
            title: buttonTitle,
            type: "RUN",
            onclick: updateAttribute
        } as buttonObjType,
        editMode,
    }
}

export default useUserTop;