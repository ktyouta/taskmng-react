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
    dateFormat?: dateFormatType,
    value?: string,
    onChange?: (e: string) => void,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

/**
 * 現在日時を取得
 */
const getNowDate = (now: Date) => {
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    return `${year}${month}${date}`;
};

/**
 * 文字列を日付に変換
 */
const parseStrDate = (strDate?: string) => {
    if (!strDate) {
        return null;
    }
    const year = parseInt(strDate.substring(0, 4));
    const month = parseInt(strDate.substring(4, 6));
    const day = parseInt(strDate.substring(6, 8)); 
    if (isNaN(Date.parse(`${year}${month}${day}`))) {
        return null;
    }
    return new Date(year, month - 1, day);
};


const DatePickerComponent = forwardRef<refType, propsType>((props, ref) => {

    const Today = new Date();
    //画面表示用
    const [date, setDate] = useState<Date | null>(parseStrDate(props.value));

    //デートピッカーの選択値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: date ? getNowDate(date) : "",
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
        setDate(parseStrDate(props.value));
    };

    //フォーカスアウトイベント
    const blur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        let tmp = Date.parse(e.target.value);
        let tmpDate = null;
        //日付の変換に成功
        if (!Number.isNaN(tmp)) {
            tmpDate = new Date(Date.parse(e.target.value));
        }
        setDate(tmpDate);
    }

    return (
        <DatePicker
            dateFormat={props.dateFormat ?? "yyyy/MM/dd"}
            locale={ja}
            selected={date}
            onChange={selectedDate => { changeDate(selectedDate || Today) }}
            className='datepicker-input'
            onBlur={selectedDate => { blur(selectedDate) }}
        />
    );
})

export default DatePickerComponent;