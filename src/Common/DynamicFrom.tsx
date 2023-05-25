import React from 'react';
import '../App.css';
import HorizonLabelInputComponent from './HorizonLabelInputComponent';
import HorizonLabelRadioListComponent from './HorizonLabelRadioListComponent';
import HorizonLabelDatePickerComponent from './HorizonLabelDatePickerComponent';
import HorizonComboComponent from './HorizonComboComponent';
import { refInfoType } from './Type/CommonType';
import HorizonLabelTextAreaComponent from './HorizonLabelTextAreaComponent';
import HorizonLabelCheckBoxListComponent from './HorizonLabelCheckBoxListComponent';

//引数の型
type propsType = {
    refInfoArray: refInfoType[]
}

function DynamicFrom(props: propsType) {

    console.log("DynamicFrom render");

    return (
        <React.Fragment>
            {
                props.refInfoArray.map((element, index) => {
                    return (
                        <div
                            className="dynamicfrom-input-area"
                            key={`${element.id}-${index}`}
                            style={{ display: element.visible ? "block" : "none" }}
                        >
                            {
                                (() => {
                                    switch (element.type) {
                                        //テキストボックス
                                        case "input":
                                            return (
                                                <HorizonLabelInputComponent
                                                    title={element.name}
                                                    value={element.value}
                                                    lenght={element.lenght}
                                                    disabled={element.disabled}
                                                    ref={element.ref}
                                                />
                                            );
                                        //テキストエリア
                                        case "textarea":
                                            return (
                                                <HorizonLabelTextAreaComponent
                                                    title={element.name}
                                                    value={element.value}
                                                    lenght={element.lenght}
                                                    disabled={element.disabled}
                                                    ref={element.ref}
                                                />
                                            );
                                        //ラジオボタン
                                        case "radio":
                                            return (
                                                element.selectList && <HorizonLabelRadioListComponent
                                                    title={element.name}
                                                    radioList={element.selectList}
                                                    selectedValue={element.value}
                                                    htmlForId={`dynamicfromradio${index}`}
                                                    disabled={element.disabled}
                                                    ref={element.ref}
                                                />
                                            );
                                        //デートピッカー(日付選択)
                                        case "date":
                                            return (
                                                <HorizonLabelDatePickerComponent
                                                    title={element.name}
                                                    value={element.value}
                                                    disabled={element.disabled}
                                                    ref={element.ref}
                                                />
                                            );
                                        //コンボボックス
                                        case "select":
                                            return (
                                                element.selectList && <HorizonComboComponent
                                                    title={element.name}
                                                    combo={element.selectList}
                                                    initValue={element.value}
                                                    disabled={element.disabled}
                                                    ref={element.ref}
                                                />
                                            )
                                        //チェックボックス
                                        case "checkbox":
                                            return (
                                                element.selectList && <HorizonLabelCheckBoxListComponent
                                                    title={element.name}
                                                    checkBox={element.selectList}
                                                    //initValue={element.value}
                                                    disabled={element.disabled}
                                                    value={element.value}
                                                    ref={element.ref}
                                                />
                                            )
                                    }
                                })()
                            }
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
}

export default DynamicFrom;