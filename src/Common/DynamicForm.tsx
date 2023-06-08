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


//説明文のスタイル
const BaseSpan = styled.span`
    font-size:15px;
    color:#ff8c00;
`;


//引数の型
type propsType = {
    refInfoArray: refInfoType[],
    titleWitdh?: string,
    listTitleWidth?: string,
}

//数値変換
function parseNum(value: string) {
    if (isNaN(Number(value))) {
        return 0;
    }
    return Number(value);
}

function DynamicForm(props: propsType) {

    console.log("DynamicForm render");

    return (
        <React.Fragment>
            {
                props.refInfoArray.map((element, index) => {
                    return (
                        <div
                            key={`${element.id}-${index}`}
                            style={{ display: element.visible ? "block" : "none" }}
                        >
                            <HorizonLabelItemComponent
                                title={element.name}
                                labelWidth={props.titleWitdh}
                                key={`dynamicform-${index}`}
                            >
                                {
                                    (() => {
                                        switch (element.type) {
                                            //テキストボックス
                                            case "input":
                                                return (
                                                    <LabelInputComponent
                                                        value={element.value}
                                                        lenght={element.length}
                                                        disabled={element.disabled}
                                                        ref={element.ref}
                                                    />
                                                );
                                            //テキストエリア
                                            case "textarea":
                                                return (
                                                    <LabelTextAreaComponent
                                                        value={element.value}
                                                        lenght={element.length}
                                                        disabled={element.disabled}
                                                        ref={element.ref}
                                                    />
                                                );
                                            //ラジオボタン
                                            case "radio":
                                                return (
                                                    element.selectList && <LabelRadioListComponent
                                                        radioList={element.selectList}
                                                        selectedValue={element.value}
                                                        htmlForId={`dynamicformradio-${index}-`}
                                                        disabled={element.disabled}
                                                        width={props.listTitleWidth ?? "50px"}
                                                        ref={element.ref}
                                                    />
                                                );
                                            //デートピッカー(日付選択)
                                            case "date":
                                                return (
                                                    <DatePickerComponent
                                                        value={element.value}
                                                        disabled={element.disabled}
                                                        ref={element.ref}
                                                    />
                                                );
                                            //コンボボックス
                                            case "select":
                                                return (
                                                    element.selectList && <ComboComponent
                                                        combo={element.selectList}
                                                        initValue={element.value}
                                                        disabled={element.disabled}
                                                        ref={element.ref}
                                                    />
                                                )
                                            //チェックボックス
                                            case "checkbox":
                                                return (
                                                    element.selectList && <LabelCheckBoxListComponent
                                                        checkBox={element.selectList}
                                                        htmlForId={`dynamicformcheckbox-${index}-`}
                                                        disabled={element.disabled}
                                                        value={element.value}
                                                        width={props.listTitleWidth ?? "50px"}
                                                        ref={element.ref}
                                                    />
                                                )
                                            //numberpicker
                                            case "number":
                                                return (
                                                    <NumberPickerComponent
                                                        disabled={element.disabled}
                                                        value={parseNum(element.value)}
                                                        ref={element.ref}
                                                    />
                                                )
                                        }
                                    })()
                                }
                            </HorizonLabelItemComponent>
                            {
                                element.description &&
                                <HorizonLabelItemComponent
                                    title={''}
                                >
                                    <BaseSpan>
                                        {element.description}
                                    </BaseSpan>
                                </HorizonLabelItemComponent>
                            }
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
}

export default DynamicForm;