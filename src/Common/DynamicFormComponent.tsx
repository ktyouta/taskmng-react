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
const OuterDiv = styled.div<{ height?: string, width?: string }>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    overflow-y: auto;
`;

//説明文のスタイル
const DescriptionDiv = styled.div`
    font-size:15px;
    color:#ff8c00;
    margin-top:1%;
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

//内側のスタイル
const InnerTable = styled.table<{ height?: string, width?: string }>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    overflow-y: auto;
    table-layout: fixed;
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
    word-break:break-word;
`;

//引数の型
type propsType = {
    refInfoArray: refInfoType[],
    outerHeight?: string,
    outerWidth?: string,
    titleTdWidth?: string,
    inputTdWidth?: string,
    inputWidth?: string,
    innerHeight?: string,
    innerWidth?: string,
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
        <OuterDiv
            width={props.outerWidth ?? "100%"}
            height={props.outerHeight ?? "100%"}
        >
            <InnerTable
                width={props.innerWidth ?? "100%"}
                height={props.innerHeight ?? "100%"}
            >
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
                                <OuterTd
                                    width={props.titleTdWidth ?? "30%"}
                                >
                                    {title}
                                </OuterTd>
                                <OuterTd
                                    width={props.inputTdWidth ?? "70%"}
                                >
                                    {
                                        (() => {
                                            switch (element.type) {
                                                //ラベル
                                                case "label":
                                                    return (
                                                        <LabelComponent
                                                            title={element.initValue}
                                                            width={props.inputWidth ?? 'auto'}
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
                                                            width={props.inputWidth ?? 'auto'}
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
                                                            width={props.inputWidth ?? 'auto'}
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
                                        <DescriptionDiv>
                                            {element.description}
                                        </DescriptionDiv>
                                    }
                                    {/* エラーメッセージ */}
                                    {
                                        element.errMessage &&
                                        <ErrMessageSpan>
                                            {element.errMessage}
                                        </ErrMessageSpan>
                                    }
                                </OuterTd>
                            </OuterTr>
                        );
                    })
                }
            </InnerTable>
        </OuterDiv>
    );
}

export default DynamicFormComponent;