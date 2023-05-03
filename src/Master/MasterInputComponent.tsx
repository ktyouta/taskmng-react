import React, { useContext } from 'react';
import '../App.css';
import './css/MasterEdit.css';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import { refInfoType } from '../Common/Type/CommonType';

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