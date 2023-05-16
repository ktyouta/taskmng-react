import React from 'react';
import '../App.css';
import RadioComponent from './RadioComponent';
import LabelComponent from './LabelComponent';


//引数の型
type propsType = {
    title: string,
    value: string,
    selectedValue: string,
    htmlForId: string,
    onChange: (e: string) => void,
    key: string,
    width?: string,
    disabled?: boolean,
}


function LabelRadioComponent(props: propsType) {

    return (
        <React.Fragment>
            <LabelComponent
                {...props}
            />
            <RadioComponent
                {...props}
            />
        </React.Fragment>
    );
}

export default LabelRadioComponent;