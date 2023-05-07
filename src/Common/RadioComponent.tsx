import React from 'react';
import '../App.css';


//引数の型
type propsType = {
    value: string,
    selectedValue: string,
    onChange: (e: string) => void,
    htmlForId: string,
    key?: string,
}


function RadioComponent(props: propsType) {

    //ラジオボタンクリックイベント
    const change: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        props.onChange(e.target.value);
    }

    return (
        <input
            type="radio"
            value={props.value}
            checked={props.selectedValue === props.value}
            onChange={change}
            id={props.htmlForId}
            key={props.key}
        />
    );
}

export default RadioComponent;