import React from 'react';
import '../App.css';
import styled from "styled-components";


//引数の型
type propsType = {
  combo: comboType[],
  onChange: (e: string) => void,
  selectedValue:string,
}

type comboType = {
  value: string,
  label: string
}

//コンボボックスの基本スタイル
const BaseSelect = styled.select`
  text-align:center;
  width: 300px;
  min-width: 200px;
  height:45px;
  min-height:30px;
  border-radius: 5px;
`;


function ComboComponent(props: propsType) {

  //コンボボックスの切り替えイベント
  const change: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <React.Fragment>
      {
        props.combo && props.combo.length > 0 &&
        <BaseSelect onChange={change} value={props.selectedValue}>
          {
            props.combo.map((element) => {
              return (
                <option
                  value={element.value}
                  key={`${element.value}-${element.label}`}
                >
                  {element.label}
                </option>
              );
            })
          }
        </BaseSelect>
      }
    </React.Fragment>

  );
}

export default ComboComponent;