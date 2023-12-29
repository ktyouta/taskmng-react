import { useAtomValue, useSetAtom } from "jotai";
import { categoryIdAtom, editModeAtom } from "./useSettingCategory";
import { editModeEnum } from "../SettingCategory";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";
import { buttonType } from "../../../Common/ButtonComponent";
import { buttonObjType } from "../SettingCategoryEditFooter";
import { categoryType, registCategoryType } from "../Type/SettingCategoryType";
import useSwitch from "../../../Common/Hook/useSwitch";

//権限ID
const AUTH_ID = "1";

//引数の型
type propsType = {
    path: string,
}

function useSettingCategoryEdit(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //カスタム属性のID
    const categoryId = useAtomValue(categoryIdAtom);
    //汎用詳細リスト(形式選択)
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //パス
    const [path, setPath] = useState<string | undefined>();
    //名称
    const [name, setName] = useState<string | undefined>();
    //コンポーネント名称
    const [componentName, setComponentName] = useState<string | undefined>();
    //権限
    const [auth, setAuth] = useState<string | undefined>();
    //コンポーネント名称の初期値
    const [initComponentName, setInitComponentName] = useState<string>();
    //表示非表示フラグ
    const [isHidden, setIsHidden] = useState<string | undefined>();

    //編集画面遷移時に更新用データを取得
    const { data: updCategory, isLoading: isLoadinGetcategory } = useQueryWrapper<categoryType>(
        {
            url: categoryId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}/${categoryId}` : ``,
            //取得したデータをセット
            afSuccessFn: (data) => {
                setErrMessage("");
                if (!data) {
                    return;
                }
                setPath(data.path);
                setName(data.name);
                setComponentName(data.componentName);
                setAuth(data.auth);
                setInitComponentName(data.componentName);
                setIsHidden(data.isHidden);
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                setErrMessage(tmp.response.data.errMessage);
            }
        }
    );

    //登録日
    let registerTime = useMemo(() => {
        return updCategory && updCategory.registerTime ? updCategory.registerTime : "";
    }, [updCategory]);

    //更新日
    let updTime = useMemo(() => {
        return updCategory && updCategory.updTime ? updCategory.updTime : "";
    }, [updCategory]);

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
            setPath("");
            setName("");
            setComponentName("");
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
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`,
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
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}/${categoryId}`,
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
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}/${categoryId}`,
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
        if (!window.confirm('カテゴリを登録しますか？')) {
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
        //コンポーネント名称が変更された場合
        if (initComponentName != body.componentName) {
            if (!window.confirm("コンポーネント名称が変更されたため、画面が表示されなくなる可能性があります。カテゴリを更新しますか？")) {
                return;
            }
        }
        else {
            if (!window.confirm('カテゴリを更新しますか？')) {
                return
            }
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
        let body: registCategoryType = {
            name: "",
            path: "",
            componentName: "",
            auth: "",
            isHidden: "0",
        };

        //パス
        if (!path) {
            alert("パスを入力してください。");
            return;
        }
        body.path = path;
        //名称
        if (!name) {
            alert("名称を入力してください");
            return;
        }
        body.name = name;
        //コンポーネント名称
        if (!componentName) {
            alert("コンポーネント名称を入力してください");
            return;
        }
        body.componentName = componentName;
        //権限
        if (!auth) {
            alert("権限を入力してください");
            return;
        }
        body.auth = auth;
        //表示非表示
        if (isHidden) {
            body.isHidden = isHidden;
        }
        return body;
    };

    return {
        categoryId,
        path,
        setPath,
        name,
        setName,
        componentName,
        setComponentName,
        auth,
        setAuth,
        isHidden,
        setIsHidden,
        authList,
        registerTime,
        updTime,
        isLoadinGetcategory,
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
    }
}

export default useSettingCategoryEdit;