import React, { useContext } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/MasterEditFooter.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import { buttonObjType } from '../Common/Type/CommonType';



//引数の型
type propsType = {
    backPageButtonObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
}

function MasterEditFooter(props: propsType) {

    console.log("mastereditfooter render");

    return (
        <div className="mastereditfooter">
            <SpaceComponent
                space={"10%"}
            />
            {
                props.backPageButtonObj &&
                props.backPageButtonObj.title &&
                props.backPageButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.backPageButtonObj.type}
                    title={props.backPageButtonObj.title}
                    onclick={props.backPageButtonObj.onclick}
                />
            }
            <SpaceComponent
                space={"48%"}
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
                space={"3%"}
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

export default MasterEditFooter;