import React, { useContext } from 'react';
import '../App.css';
import './css/MasterEdit.css';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import { refInfoType } from '../Common/Type/CommonType';
import HorizonLabelRadioListComponent from '../Common/HorizonLabelRadioListComponent';
import HorizonLabelDatePickerComponent from '../Common/HorizonLabelDatePickerComponent';

//引数の型
type propsType = {
    refInfoArray: refInfoType[]
}

function MasterInputComponent(props: propsType) {

    console.log("MasterInputComponent render");

    return (
        <React.Fragment>
            {
                props.refInfoArray.map((element, index) => {
                    return (
                        <div
                            className="masteredit-input-area"
                            key={`${element.id}-${index}`}
                            style={{ display: element.visible ? "block" : "none" }}
                        >
                            {
                                (() => {
                                    switch (element.type) {
                                        //テキストエリア
                                        case "input":
                                            return (
                                                <HorizonLabelInputComponent
                                                    title={element.name}
                                                    value={element.value}
                                                    lenght={element.lenght}
                                                    editFlg={element.editFlg}
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
                                                    ref={element.ref}
                                                />
                                            );
                                        //デートピッカー(日付選択)
                                        case "date":
                                            return (
                                                <HorizonLabelDatePickerComponent
                                                    title={element.name}
                                                    ref={element.ref}
                                                />
                                            );
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

export default MasterInputComponent;