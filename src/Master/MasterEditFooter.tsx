import React, { useContext } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/MasterEditFooter.css';
import ButtonComponent from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';

//引数の型
type propsType = {
    buttonTitle: string | undefined,
    backPageButtonFunc: () => void,
    runButtonFunc: () => void,
    clearButtonFunc: () => void,
}

function MasterEditFooter(props: propsType) {

    console.log("mastereditfooter render");

    return (
        <div className="mastereditfooter">
            <SpaceComponent
                space={"10%"}
            />
            <ButtonComponent
                styleTypeNumber="BASE"
                title={"戻る"}
                onclick={props.backPageButtonFunc}
            />
            <SpaceComponent
                space={"48%"}
            />
            <ButtonComponent
                styleTypeNumber="RUN"
                title={"元に戻す"}
                onclick={props.clearButtonFunc}
            />
            <SpaceComponent
                space={"3%"}
            />
            {
                props.buttonTitle &&
                <ButtonComponent
                    styleTypeNumber="RUN"
                    title={props.buttonTitle}
                    onclick={props.runButtonFunc}
                />
            }
        </div>
    );
}

export default MasterEditFooter;