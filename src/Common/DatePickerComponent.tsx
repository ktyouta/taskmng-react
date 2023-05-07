import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import './css/DatePickerComponent.css';


//日付のフォーマット
type dateFormatType = "yyyy/MM/dd" | "yyyy/MM/dd HH:mm";

//引数の型
type propsType = {
    dateFormat?: dateFormatType
    onChange?: (e: string) => void,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}


const DatePickerComponent = forwardRef<refType, propsType>((props, ref) => {

    const Today = new Date();
    //画面表示用
    const [date, setDate] = useState<Date | null>();

    //デートピッカーの選択値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: date ? date?.toString() : "",
        clearValue: clearDate
    }));

    //デートピッカーの選択イベント
    const changeDate = (e: Date | null) => {
        let date = "";
        if (e) {
            date = e.toString();
        }
        if (props.onChange) {
            props.onChange(date);
        }
        setDate(e);
    };

    //デートピッカーの初期化
    const clearDate = () => {
        setDate(null);
    };

    return (
        <DatePicker
            dateFormat={props.dateFormat ?? "yyyy/MM/dd"}
            locale={ja}
            selected={date}
            onChange={selectedDate => { changeDate(selectedDate || Today) }}
            className='datepicker-input'
        />
    );
})

export default DatePickerComponent;