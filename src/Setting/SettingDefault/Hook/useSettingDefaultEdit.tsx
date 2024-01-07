import { useAtomValue, useSetAtom } from "jotai";
import { defaultAttributeIdAtom, editModeAtom } from "./useSettingDefault";
import { editModeEnum } from "../SettingDefault";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";
import { buttonType } from "../../../Common/ButtonComponent";
import { buttonObjType } from "../SettingDefaultEditFooter";
import { defaultAttributeType } from "../Type/SettingDefaultType";


//引数の型
type propsType = {
    path: string,
}

function useSettingDefaultEdit(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //デフォルト属性のID
    const defaultAttributeId = useAtomValue(defaultAttributeIdAtom);
    //汎用詳細リスト(形式選択)
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //デフォルト属性のパラメータ
    //ID
    const [id, setId] = useState<string | undefined>();
    //名称
    const [caNm, setCaNm] = useState<string | undefined>();
    //説明
    const [caDescription, setCaDescription] = useState<string | undefined>();
    //デフォルト属性の形式
    const [caType, setCaType] = useState<string | undefined>();
    //必須
    const [caRequired, setCaRequired] = useState<boolean | undefined>();
    //表示フラグ
    const [isHidden, setIsHidden] = useState<boolean | undefined>();
    //初期作成時表示フラグ
    const [isNewCreateVisible, setIsNewCreateVisible] = useState<boolean | undefined>();
    //入力可能数
    const [length, setLength] = useState<number | undefined>();

    //編集画面遷移時に更新用デフォルト属性を取得
    const { data: updDefaultAttribute, isLoading: isLoadinGetDefaultAttribute } = useQueryWrapper<defaultAttributeType>(
        {
            url: defaultAttributeId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKINPUTSETTING}/${defaultAttributeId}` : ``,
            //取得したデータをセット
            afSuccessFn: (data) => {
                setErrMessage("");
                if (!data) {
                    return;
                }
                setId(data.id);
                setCaNm(data.name);
                setCaDescription(data.description);
                setCaType(data.type);
                setCaRequired(data.isRequired);
                setIsHidden(data.isHidden);
                setIsNewCreateVisible(data.isNewCreateVisible);
                setLength(data.length);
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                setErrMessage(tmp.response.data.errMessage);
            }
        }
    );

    //登録日
    let registerTime = useMemo(() => {
        return updDefaultAttribute && updDefaultAttribute.registerTime ? updDefaultAttribute.registerTime : "";
    }, [updDefaultAttribute]);

    //更新日
    let updTime = useMemo(() => {
        return updDefaultAttribute && updDefaultAttribute.updTime ? updDefaultAttribute.updTime : "";
    }, [updDefaultAttribute]);

    //デフォルト属性の形式
    const typeValue = useMemo(() => {
        if (!generalDataList || !caType) {
            return "";
        }
        let tmp = generalDataList.filter((element) => {
            return element.id === "4" && element.value === caType;
        });
        return tmp && tmp.length > 0 ? tmp[0].label : "";
    }, [generalDataList, caType]);

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

    //URLを直打ちした際にデフォルト画面トップに遷移させる
    useEffect(() => {
        //モード未選択状態
        if (editMode === editModeEnum.noselect) {
            navigate(`${props.path}`);
        }
    }, []);

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}/${defaultAttributeId}`,
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
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}/${defaultAttributeId}`,
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
     * 戻るイベント
     */
    const backPage = () => {
        navigate(`${props.path}`);
    };

    /**
     * 更新イベント
     */
    const updateAttribute = () => {
        let body = createRequestBody();
        if (!body) {
            return;
        }
        if (!window.confirm('デフォルト属性を更新しますか？')) {
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
        if (!window.confirm('デフォルト属性を削除しますか？')) {
            return
        }
        delMutation.mutate();
    }

    /**
     * リクエストボディの作成
     */
    const createRequestBody = () => {
        let body: defaultAttributeType = {
            id: "",
            name: "",
            description: "",
            type: "",
            isRequired: false,
            selectElementList: [],
            isNewCreateVisible: false,
            isHidden: false,
            length: 0
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
        //デフォルト属性の形式
        if (!caType) {
            alert("属性の形式を選択してください");
            return;
        }
        body.type = caType;

        //必須
        if (caRequired) {
            body.isRequired = caRequired;
        }

        return body;
    };

    return {
        id,
        caNm,
        caDescription,
        caType,
        caRequired,
        isHidden,
        isNewCreateVisible,
        setId,
        setCaNm,
        setCaDescription,
        setCaType,
        setCaRequired,
        setIsHidden,
        setIsNewCreateVisible,
        isLoadinGetDefaultAttribute,
        backPage,
        updateAttribute,
        deleteAttribute,
        typeValue,
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
            title: "更新",
            type: "RUN",
            onclick: updateAttribute
        } as buttonObjType,
        registerTime,
        updTime,
        editMode,
    }
}

export default useSettingDefaultEdit;