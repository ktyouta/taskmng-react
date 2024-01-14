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
import { defaultAttributeInputRefType, defaultAttributeType, defaultAttributeUpdType } from "../Type/SettingDefaultType";


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
    //可変選択リスト
    const [selectElementList, setSelectElementList] = useState<defaultAttributeInputRefType[] | undefined>();

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
                setCaNm(data.name);
                setCaDescription(data.description);
                setCaType(data.type);
                setCaRequired(data.isRequired);
                setIsHidden(data.isHidden);
                setIsNewCreateVisible(data.isNewCreateVisible);
                setLength(data.length);
                //選択リストを所持している場合
                if (data.selectElementList && data.selectElementList.length > 0) {
                    let tmpRefArray: defaultAttributeInputRefType[] = [];
                    for (let i = 0; i < data.selectElementList.length; i++) {
                        tmpRefArray.push({
                            value: data.selectElementList[i].value,
                            ref: createRef(),
                            label: data.selectElementList[i].label
                        });
                    }
                    setSelectElementList(tmpRefArray);
                }
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                setErrMessage(tmp.response.data.errMessage);
            }
        }
    );

    //ID
    let defaultId = useMemo(() => {
        return updDefaultAttribute && updDefaultAttribute.id ? updDefaultAttribute.id : "";
    }, [updDefaultAttribute]);

    //形式
    let type = useMemo(() => {
        return updDefaultAttribute && updDefaultAttribute.type ? updDefaultAttribute.type : "";
    }, [updDefaultAttribute]);

    //登録日
    let registerTime = useMemo(() => {
        return updDefaultAttribute && updDefaultAttribute.registerTime ? updDefaultAttribute.registerTime : "";
    }, [updDefaultAttribute]);

    //更新日
    let updTime = useMemo(() => {
        return updDefaultAttribute && updDefaultAttribute.updTime ? updDefaultAttribute.updTime : "";
    }, [updDefaultAttribute]);

    //編集可能フラグ
    let isSettingEditable = useMemo(() => {
        return updDefaultAttribute && updDefaultAttribute.isSettingEditable ? updDefaultAttribute.isSettingEditable : false;
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

    //URLを直打ちした際にデフォルト画面トップに遷移させる
    useEffect(() => {
        //モード未選択状態
        if (editMode === editModeEnum.noselect) {
            navigate(`${props.path}`);
        }
    }, []);

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKINPUTSETTING}/${defaultAttributeId}`,
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
     * リクエストボディの作成
     */
    const createRequestBody = () => {
        let body: defaultAttributeUpdType = {
            name: "",
            description: "",
            isRequired: false,
            isNewCreateVisible: false,
            isHidden: false,
            length: 0,
            selectElementList: []
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

        //必須
        if (caRequired && !isHidden && isNewCreateVisible) {
            body.isRequired = caRequired;
        }

        //表示非表示
        if (isHidden) {
            body.isHidden = isHidden;
        }

        //初期作成時表示非表示フラグ
        if (isNewCreateVisible) {
            body.isNewCreateVisible = isNewCreateVisible;
        }

        //入力可能文字数
        if (length) {
            body.length = length;
        }

        //選択リスト
        if (selectElementList) {
            body.selectElementList = selectElementList.map((element) => {
                return {
                    value: element.value,
                    label: element.ref.current ? element.ref.current.refValue : ""
                }
            });
        }

        return body;
    };

    return {
        defaultId,
        type,
        caNm,
        caDescription,
        caType,
        caRequired,
        isHidden,
        isNewCreateVisible,
        length,
        isSettingEditable,
        setCaNm,
        setCaDescription,
        setCaType,
        setCaRequired,
        setIsHidden,
        setIsNewCreateVisible,
        setLength,
        isLoadinGetDefaultAttribute,
        backPage,
        updateAttribute,
        typeValue,
        positiveButtonObj: {
            title: '戻る',
            type: "BASE",
            onclick: backPage
        } as buttonObjType,
        runButtonObj: {
            title: "更新",
            type: "RUN",
            onclick: updateAttribute
        } as buttonObjType,
        registerTime,
        updTime,
        editMode,
        selectElementList,
    }
}

export default useSettingDefaultEdit;