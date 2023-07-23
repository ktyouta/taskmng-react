import { useAtomValue, useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { customAttributeType, inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import { generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";


function useSettingCustomEditMain() {

    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");

    //汎用詳細リスト(形式選択)
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //カスタム属性のパラメータ
    //名称
    const [caNm, setCaNm] = useState("");
    //説明
    const [caDescription, setCaDescription] = useState("");
    //カスタム属性の形式
    const [caType, setCaType] = useState("");
    //必須
    const [caRequired, setCaRequired] = useState(false);
    //可変選択リスト
    const [selectElementList, setSelectElementList] = useState<inputRefType[]>([]);


    //モーダル展開時に更新用タスクを取得
    const { data: updCustomAttribute, isLoading: isLoadinGetCustomAttribute } = useQueryWrapper<customAttributeType>(
        {
            url: customAttributeId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}/${customAttributeId}` : ``,
            afSuccessFn: (data) => {
                setErrMessage("");
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
        //新規登録の場合はセットしない
        if (!updCustomAttribute) {
            return;
        }
        setCaNm(updCustomAttribute.name);
        setCaDescription(updCustomAttribute.description);
        setCaType(updCustomAttribute.type);
        setCaRequired(updCustomAttribute.required);
    }, [updCustomAttribute]);

    return {
        isLoadinGetCustomAttribute,
        errMessage,
        caNm,
        setCaNm,
        caDescription,
        setCaDescription,
        caType,
        setCaType,
        caRequired,
        setCaRequired,
        addSelectElement,
        selectElementList,
        caSelectList,
    }
}

export default useSettingCustomEditMain;