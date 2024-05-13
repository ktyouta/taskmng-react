import React from 'react';
import '../App.css';
import { refInfoType } from './Type/CommonType';
import HorizonLabelItemComponent from './HorizonLabelItemComponent';
import LabelInputComponent from './LabelInputComponent';
import LabelTextAreaComponent from './LabelTextAreaComponent';
import LabelRadioListComponent from './LabelRadioListComponent';
import DatePickerComponent from './DatePickerComponent';
import ComboComponent from './ComboComponent';
import LabelCheckBoxListComponent from './LabelCheckBoxListComponent';
import NumberPickerComponent from './NumberPickerComponent';
import styled from 'styled-components';
import BaseInputComponent from './BaseInputComponent';
import LabelComponent from './LabelComponent';


//外側のスタイル
const OuterDiv = styled.div<{ visible: boolean }>`
    display: ${({ visible }) => (visible ? "block" : "none")};
`;

//説明文のスタイル
const DescriptionSpan = styled.span`
    font-size:15px;
    color:#ff8c00;
`;

//エラーメッセージのスタイル
const ErrMessageSpan = styled.span`
    font-size:15px;
    color:#DC143C;
`;

//必須項目のスタイル
const RequiredSpan = styled.span`
    color: red;
`;

//外側のスタイル
const OuterTable = styled.table<{ height?: string, width?: string }>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
`;

//tbodyのスタイル
const OuterTbody = styled.tbody`
    
`;

//trのスタイル
const OuterTr = styled.tr`
    width:100%;
`;

//tdのスタイル
const OuterTd = styled.td<{ height?: string, width?: string }>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
`;

//引数の型
type propsType = {
    refInfoArray: refInfoType[],
    titleWidth?: string,
    listTitleWidth?: string,
    childWidth?: string,
}

//数値変換
function parseNum(value: string) {
    if (isNaN(Number(value))) {
        return 0;
    }
    return Number(value);
}

function DynamicFormComponent(props: propsType) {

    console.log("DynamicFormComponent render");

    return (
        <React.Fragment>
            <OuterTable>
                <OuterTbody>
                    {
                        props.refInfoArray.map((element, index) => {
                            let title =
                                <React.Fragment>
                                    {element.name}
                                    {element.isRequired && <RequiredSpan>*</RequiredSpan>}
                                </React.Fragment>;
                            let bgColor = element.errMessage ? "#FA8072" : "";
                            return (
                                <OuterTr>
                                    <OuterTd>
                                        {title}
                                    </OuterTd>
                                    <OuterTd>
                                        <OuterDiv
                                            key={`${element.id}-${index}`}
                                            visible={element.visible}
                                        >
                                            {
                                                (() => {
                                                    switch (element.type) {
                                                        //ラベル
                                                        case "label":
                                                            return (
                                                                <LabelComponent
                                                                    title={element.initValue}
                                                                    width='auto'
                                                                />
                                                            );
                                                        //テキストボックス
                                                        case "input":
                                                            return (
                                                                <BaseInputComponent
                                                                    value={element.initValue}
                                                                    length={element.length}
                                                                    disabled={element.disabled}
                                                                    bgColor={bgColor}
                                                                    ref={element.ref}
                                                                />
                                                            );
                                                        //テキストエリア
                                                        case "textarea":
                                                            return (
                                                                <LabelTextAreaComponent
                                                                    value={element.initValue}
                                                                    length={element.length}
                                                                    disabled={element.disabled}
                                                                    bgColor={bgColor}
                                                                    ref={element.ref}
                                                                />
                                                            );
                                                        //ラジオボタン
                                                        case "radio":
                                                            return (
                                                                element.selectList && <LabelRadioListComponent
                                                                    radioList={element.selectList}
                                                                    selectedValue={element.initValue}
                                                                    htmlForId={`dynamicformradio-${index}`}
                                                                    disabled={element.disabled}
                                                                    width={props.listTitleWidth ?? "auto"}
                                                                    ref={element.ref}
                                                                />
                                                            );
                                                        //デートピッカー(日付選択)
                                                        case "date":
                                                            return (
                                                                <DatePickerComponent
                                                                    value={element.initValue}
                                                                    disabled={element.disabled}
                                                                    bgColor={bgColor}
                                                                    ref={element.ref}
                                                                />
                                                            );
                                                        //コンボボックス
                                                        case "select":
                                                            return (
                                                                element.selectList && <ComboComponent
                                                                    combo={element.selectList}
                                                                    initValue={element.initValue}
                                                                    disabled={element.disabled}
                                                                    bgColor={bgColor}
                                                                    ref={element.ref}
                                                                />
                                                            )
                                                        //チェックボックス
                                                        case "checkbox":
                                                            return (
                                                                element.selectList && <LabelCheckBoxListComponent
                                                                    checkBox={element.selectList}
                                                                    htmlForId={`dynamicformcheckbox-${index}`}
                                                                    disabled={element.disabled}
                                                                    initValue={element.initValue}
                                                                    width={props.listTitleWidth ?? "auto"}
                                                                    ref={element.ref}
                                                                />
                                                            )
                                                        //numberpicker
                                                        case "number":
                                                            return (
                                                                <NumberPickerComponent
                                                                    disabled={element.disabled}
                                                                    value={parseNum(element.initValue)}
                                                                    bgColor={bgColor}
                                                                    ref={element.ref}
                                                                />
                                                            )
                                                    }
                                                })()
                                            }
                                            {/* 項目の説明文 */}
                                            {
                                                element.description &&
                                                <HorizonLabelItemComponent
                                                    title={''}
                                                    width={props.titleWidth}
                                                >
                                                    <DescriptionSpan>
                                                        {element.description}
                                                    </DescriptionSpan>
                                                </HorizonLabelItemComponent>
                                            }
                                            {/* エラーメッセージ */}
                                            {
                                                element.errMessage &&
                                                <HorizonLabelItemComponent
                                                    title={''}
                                                    width={props.titleWidth}
                                                >
                                                    <ErrMessageSpan>
                                                        {element.errMessage}
                                                    </ErrMessageSpan>
                                                </HorizonLabelItemComponent>}
                                        </OuterDiv>
                                    </OuterTd>
                                </OuterTr>
                            );
                        })
                    }
                </OuterTbody>
            </OuterTable>
        </React.Fragment>
    );
}

export default DynamicFormComponent;