import { useAtomValue, useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { customAttributeType, inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";
import { buttonType } from "../../../Common/ButtonComponent";
import { buttonObjType } from "../SettingCustomEditFooter";


function useSettingCustomEdit() {

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
    const [caRequired, setCaRequired] = useState(false);
    //可変選択リスト
    const [selectElementList, setSelectElementList] = useState<inputRefType[]>([{
        value: "",
        ref: createRef(),
    }]);

    //入力参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<refInfoType[]>([]);
    

    //モーダル展開時に更新用タスクを取得
    const { data: updCustomAttribute, isLoading: isLoadinGetCustomAttribute } = useQueryWrapper<customAttributeType>(
        {
            url: customAttributeId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}/${customAttributeId}` : ``,
            afSuccessFn: (data) => {
                setErrMessage("");
                if (!data) {
                    return;
                }
                setCaNm(data.name);
                setCaDescription(data.description);
                setCaType(data.format);
                setCaRequired(data.required);
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                setErrMessage(tmp.response.data.errMessage);
            }
        }
    );

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

    //カスタム属性の形式リスト
    const caSelectList = useMemo(() => {
        if (!generalDataList) {
            return;
        }
        let tmp: radioType[] = generalDataList.filter((element) => {
            return element.id === "4";
        }).map((element) => {
            return { label: element.label, value: element.value }
        });
        return tmp;
    }, [generalDataList]);

    //初期値セット
    useEffect(() => {
        //新規登録
        if (editMode === editModeEnum.create) {
            setCaNm("");
            setCaDescription("");
            setCaType("");
            setCaRequired(false);
            return;
        }
    }, []);

    //URLを直打ちした際にカスタム画面トップに遷移させる
    useEffect(() => {
        //モード未選択状態
        if (editMode === editModeEnum.noselect) {
            navigate(`/setting/custom`);
        }
    }, []);

    //登録用フック
    const registMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTING}${ENV.CUSTOM}/${customAttributeId}`,
        method: "POST",
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

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTING}${ENV.CUSTOM}/${customAttributeId}`,
        method: "PUT",
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

    //削除用フック
    const delMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTING}${ENV.CUSTOM}/${customAttributeId}`,
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
        navigate(`/setting/custom`);
    };

    /**
     * 登録イベント
     */
    const registeAttribute = () => {
        //registMutation.mutate();
    }

    /**
     * 更新イベント
     */
    const updateAttribute = () => {
        //updMutation.mutate();
    }

    /**
     * 削除イベント
     */
    const deleteAttribute = () => {
        delMutation.mutate();
    }

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
        addSelectElement,
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
            onclick: registeAttribute
        } as buttonObjType,
    }
}

export default useSettingCustomEdit;