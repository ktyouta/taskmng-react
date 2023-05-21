import React, { RefObject, createRef, forwardRef, useEffect, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelRadioComponent from './LabelRadioComponent';
import LabelCheckBoxComponent from './LabelCheckBoxComponent';
import { checkBoxRefType } from './CheckBoxComponent';


//チェックボックスの型
export type checkBoxType = {
    label: string,
    value: string,
}

//引数の型
type propsType = {
    checkBox: checkBoxType[],
    radioLabelWidth?: string,
    id?: string,
    disabled?: boolean,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//チェックボックスの参照
type checkBoxRefInfoType = {
    label:string,
    value:string,
    ref:RefObject<checkBoxRefType>
}

//チェックボックスリストの基本スタイル
const OuterDiv = styled.div`
  display:flex;
`;

//チェックボックスの選択値を取得
function getCheckBoxValues(refList:checkBoxRefInfoType[]){
    let tmp = refList.map((element)=>{
        return element.value;
    });
    return tmp.join(",");
}


const LabelCheckBoxListComponent = forwardRef<refType, propsType>((props, ref) => {

    //チェックボックスの参照
    const [checkBoxRefList, setCheckBoxRefList] = useState<checkBoxRefInfoType[]>([]);

    //チェックボックスの参照リストを作成
    useEffect(()=>{
        if(!props.checkBox || props.checkBox.length === 0){
            return;
        }
        let tmp:checkBoxRefInfoType[] = [];
        props.checkBox.forEach((element)=>{
            tmp.push({
                label: element.label,
                value: element.value,
                ref: createRef()
            });
        });
        setCheckBoxRefList(tmp);
    },[props.checkBox]);

    //チェックボックスの選択値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: getCheckBoxValues(checkBoxRefList),
        clearValue: clearRadio
    }));

    //チェックボックスの初期化
    const clearRadio = () => {
        checkBoxRefList.forEach((element)=>{
            element.ref.current?.clearValue();
        });
    };

    return (
        <OuterDiv>
            {
                checkBoxRefList.map((element) => {
                    return (
                        <LabelCheckBoxComponent
                            key={element.value}
                            title={element.label}
                            value={element.value}
                            id={props.id ? `${props.id}${element.value}` : element.value}
                            width={props.radioLabelWidth}
                            disabled={props.disabled}
                        />
                    );
                })
            }
        </OuterDiv>
    );
})

export default LabelCheckBoxListComponent;