import React, { RefObject, createRef, forwardRef, useEffect, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelRadioComponent from './LabelRadioComponent';
import LabelCheckBoxComponent from './LabelCheckBoxComponent';
import { checkBoxRefType } from './CheckBoxComponent';
import SpaceComponent from './SpaceComponent';


//チェックボックスの型
export type checkBoxType = {
    label: string,
    value: string,
}

//引数の型
type propsType = {
    checkBox: checkBoxType[],
    htmlForId?: string,
    disabled?: boolean,
    value: string,
    width?: string,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//チェックボックスの参照
type checkBoxRefInfoType = {
    label: string,
    value: string,
    ref: RefObject<checkBoxRefType>
}

//チェックボックスリストの基本スタイル
const OuterDiv = styled.div`
  display:flex;
`;

//チェックボックスの選択値を取得
function getCheckBoxValues(list: string[]) {
    return list.join(",");
}

//初期値判定
function getInitValue(value: string, initList: string[]) {
    return initList.includes(value);
}


const LabelCheckBoxListComponent = forwardRef<refType, propsType>((props, ref) => {

    //チェックボックスの参照
    const [checkBoxRefList, setCheckBoxRefList] = useState<checkBoxRefInfoType[]>();
    //チェックボックスの選択値リスト
    const [checkBoxIdList, setCheckBoxIdList] = useState<string[]>(props.value.split(",").filter(e => e));

    //参照の作成
    useEffect(() => {
        let tmp: checkBoxRefInfoType[] = [];
        props.checkBox.forEach((element) => {
            tmp.push({
                label: element.label,
                value: element.value,
                ref: createRef(),
            });
        });
        setCheckBoxRefList(tmp);
    }, [props.checkBox]);

    //チェックボックスの選択値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: getCheckBoxValues(checkBoxIdList),
        clearValue: clearCheckBox
    }));

    //チェックボックスの初期化
    const clearCheckBox = () => {
        checkBoxRefList?.forEach((element) => {
            element.ref.current?.clearValue();
        });
        setCheckBoxIdList(props.value.split(",").filter(e => e));
    };

    //チェックボックスのクリックイベント
    const changeCheckBox = (e: string) => {
        let tmp = [...checkBoxIdList];
        //IDを含む(チェックボックスにチェックが入っている場合)
        if (checkBoxIdList.includes(e)) {
            tmp = tmp.filter((element) => {
                return element !== e;
            });
        }
        else {
            tmp.push(e);
        }
        setCheckBoxIdList(tmp);
    };

    return (
        <OuterDiv>
            {
                checkBoxRefList && checkBoxRefList.length > 0 && checkBoxRefList.map((element, index) => {
                    return (
                        <React.Fragment>
                            <LabelCheckBoxComponent
                                key={`${element.value}-${index}`}
                                title={element.label}
                                value={element.value}
                                htmlForId={props.htmlForId ? `${props.htmlForId}${element.value}` : element.value}
                                width={props.width}
                                disabled={props.disabled}
                                onChange={changeCheckBox}
                                initValue={getInitValue(element.value, props.value.split(","))}
                                ref={element.ref}
                            />
                            <SpaceComponent
                                key={`labelcheckboxspace${element.value}`}
                                space={'70px'}
                            />
                        </React.Fragment>
                    );
                })
            }
        </OuterDiv>
    );
})

export default LabelCheckBoxListComponent;