import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { buttonObjType, generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";
import { buttonType } from "../../../Common/ButtonComponent";
import { customAttributeType, resClientCustomAttributeType, selectElementListType, updCustomAttributeType } from "../Type/SettingCustomType";
import { customAttributeIdAtom, editModeAtom } from "../Atom/SettingCustomAtom";
import { editModeEnum } from "../../Const/SettingConst";
import { GENERAL_DETAIL_AUTH_ID, GENERAL_DETAIL_CUSTOMTYPELIST_ID } from "../Const/SettingCustomConst";
import { USER_AUTH } from "../../../Common/Const/CommonConst";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userInfoAtom } from "../../../Content/Atom/ContentAtom";


//引数の型
type propsType = {
    path: string,
}

function useSettingCustomEdit(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);
    //汎用詳細リスト(形式選択)
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //カスタム属性のパラメータ
    //名称
    const [caNm, setCaNm] = useState<string | undefined>();
    //説明
    const [caDescription, setCaDescription] = useState<string | undefined>();
    //カスタム属性の形式
    const [caType, setCaType] = useState<string | undefined>();
    //必須
    const [caRequired, setCaRequired] = useState<boolean | undefined>();
    //可変選択リスト
    const [selectElementList, setSelectElementList] = useState<inputRefType[]>([{
        value: "",
        ref: createRef(),
    }]);
    //カスタム属性の初期選択リスト
    const [initSelectList, setInitSelectList] = useState<selectElementListType[]>([]);
    //カスタム属性の権限
    const [caAuth, setCaAuth] = useState<string | undefined>();
    // ログインユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    //編集画面遷移時に更新用タスクを取得
    const { data: updCustomAttribute, isLoading: isLoadinGetCustomAttribute } = useQueryWrapper<resClientCustomAttributeType>(
        {
            url: customAttributeId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}/${customAttributeId}` : ``,
            //取得したデータをセット
            afSuccessFn: (data: resClientCustomAttributeType) => {
                setErrMessage("");
                if (!data) {
                    return;
                }
                setCaNm(data.name);
                setCaDescription(data.description);
                setCaType(data.type);
                setCaRequired(data.required);
                setCaAuth(data.auth);
                //選択リストを所持している場合
                if (data.selectElementList && data.selectElementList.length > 0) {
                    let tmpRefArray: inputRefType[] = [];
                    for (let i = 0; i < data.selectElementList.length; i++) {
                        tmpRefArray.push({
                            value: data.selectElementList[i].value,
                            ref: createRef()
                        });
                    }
                    setSelectElementList(tmpRefArray);
                    setInitSelectList(data.selectElementList);
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
        return updCustomAttribute && updCustomAttribute.registerTime ? updCustomAttribute.registerTime : "";
    }, [updCustomAttribute]);

    //更新日
    let updTime = useMemo(() => {
        return updCustomAttribute && updCustomAttribute.updTime ? updCustomAttribute.updTime : "";
    }, [updCustomAttribute]);

    //要素の追加ボタン押下
    const addSelectElement = () => {
        let tmpSelectElementList = [...selectElementList];
        //要素を一つ追加
        tmpSelectElementList.push({
            value: "",
            ref: createRef(),
        });
        setSelectElementList(tmpSelectElementList);
    };

    //要素の削除ボタン押下
    const deleteSelectElement = () => {
        let tmpSelectElementList = [...selectElementList];
        if (tmpSelectElementList.length === 1) {
            alert("選択項目は最低一つは必要です。");
            return;
        }
        //入力値が存在する場合は削除確認をする
        if (tmpSelectElementList[tmpSelectElementList.length - 1].ref.current?.refValue) {
            if (!window.confirm("項目が入力されていますが、削除しますか？")) {
                return;
            }
        }
        tmpSelectElementList.pop();
        setSelectElementList(tmpSelectElementList);
    };

    //カスタム属性の形式リスト
    const caSelectList = useMemo(() => {

        if (!generalDataList) {
            return;
        }

        let tmp: radioType[] = generalDataList.filter((element) => {
            return element.id === GENERAL_DETAIL_CUSTOMTYPELIST_ID;
        }).map((element) => {
            return { label: element.label, value: element.value }
        });

        return tmp;
    }, [generalDataList]);

    //権限リスト
    const authList = useMemo(() => {

        if (!generalDataList) {
            return;
        }

        if (!userInfo) {
            return;
        }

        //ユーザー権限
        let userAuth = userInfo.auth;

        if (Number.isNaN(userAuth) || Number.isNaN(USER_AUTH.PUBLIC)) {
            return;
        }

        //ユーザーの権限が一般の場合は権限のリストを表示しない
        if (parseInt(userAuth) <= parseInt(USER_AUTH.PUBLIC)) {
            return;
        }

        let tmp: radioType[] = generalDataList.filter((element) => {
            return element.id === GENERAL_DETAIL_AUTH_ID;
        }).map((element) => {
            return { label: element.label, value: element.value }
        });

        return tmp;
    }, [generalDataList, userInfo]);

    //初期値セット
    useEffect(() => {
        //新規登録
        if (editMode === editModeEnum.create) {
            setCaNm("");
            setCaDescription("");
            setCaType("");
            setCaRequired(false);
            setCaAuth(USER_AUTH.PUBLIC);
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
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}`,
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
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}/${customAttributeId}`,
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
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}/${customAttributeId}`,
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
        if (!window.confirm('カスタム属性を登録しますか？')) {
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
        if (!window.confirm('カスタム属性を更新しますか？')) {
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
        if (!window.confirm('カスタム属性を削除しますか？')) {
            return
        }
        delMutation.mutate();
    }

    /**
     * リクエストボディの作成
     */
    const createRequestBody = () => {
        let body: updCustomAttributeType = {
            id: "",
            name: "",
            description: "",
            type: "",
            required: false,
            selectElementList: [],
            auth: "",
        };

        //名称
        if (!caNm) {
            alert("名称を入力してください");
            return;
        }
        body.name = caNm;

        //説明
        if (caDescription) {
            body.description = caDescription;
        }
        //カスタム属性の形式
        if (!caType) {
            alert("属性の形式を選択してください");
            return;
        }
        body.type = caType;

        //必須
        if (caRequired) {
            body.required = caRequired;
        }

        let selectList: selectElementListType[] = [];
        //カスタム属性の形式が選択形式の場合はリストをセット
        if (caType === "select" || caType === "radio" || caType === "checkbox") {
            selectList = [...selectElementList].map((element: inputRefType, index) => {
                //行番号が存在する場合はセット
                return {
                    no: initSelectList[index] ? initSelectList[index].no : "",
                    value: element.ref.current && element.ref.current.refValue ? element.ref.current.refValue.trim() : ""
                };
            });

            //リストが全て空欄の場合
            if (selectList.filter((element) => !element.value.trim()).length === selectList.length) {
                alert("1つ以上の項目が必要です。");
                return;
            }

            //リストの重複チェック
            if (new Set(selectList.map((element) => element.value.trim())).size !== selectList.length) {
                alert("選択項目が重複しています。");
                return;
            }
        }

        //権限
        if (caAuth) {
            body.auth = caAuth;
        }
        else {
            body.auth = USER_AUTH.PUBLIC;
        }

        body.selectElementList = selectList;
        return body;
    };

    return {
        caNm,
        caDescription,
        caType,
        caRequired,
        caSelectList,
        selectElementList,
        setCaNm,
        setCaDescription,
        setCaType,
        setCaRequired,
        isLoadinGetCustomAttribute,
        addSelectElement,
        deleteSelectElement,
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
        registerTime,
        updTime,
        editMode,
        customAttributeId,
        authList,
        caAuth,
        setCaAuth,
    }
}

export default useSettingCustomEdit;