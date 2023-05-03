import React, { useContext } from 'react';
import logo from './logo.svg';
import '../App.css';
import '../Master/css/MasterEditFooter.css';
import ButtonComponent from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import { buttonObjType } from '../Master/MasterEditFooter';

//引数の型
type propsType = {
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
}

function AddMasterTopFooter(props: propsType) {

    console.log("mastereditfooter render");

    return (
        <div className="mastereditfooter">
            <SpaceComponent
                space={"10%"}
            />
            {
                props.negativeButtonObj &&
                props.negativeButtonObj.title &&
                props.negativeButtonObj.onclick &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.negativeButtonObj.type}
                    title={props.negativeButtonObj.title}
                    onclick={props.negativeButtonObj.onclick}
                />
            }
            <SpaceComponent
                space={"51%"}
            />
            {
                props.positiveButtonObj &&
                props.positiveButtonObj.title &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.positiveButtonObj.type}
                    title={props.positiveButtonObj.title}
                    onclick={props.positiveButtonObj.onclick}
                />
            }
        </div>
    );
}

export default AddMasterTopFooter;