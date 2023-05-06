import React from 'react';
import '../App.css';
import RadioComponent from './RadioComponent';
import LabelComponent from './LabelComponent';


//引数の型
type propsType = {
    title: string,
    value: string,
    selectedValue: string,
    onChange: (e: string) => void,
}


function LabelRadioComponent(props: propsType) {

    return (
        <React.Fragment>
            <LabelComponent
                title={props.title}
            />
            <RadioComponent
                {...props}
            />
        </React.Fragment>
    );
}

export default LabelRadioComponent;