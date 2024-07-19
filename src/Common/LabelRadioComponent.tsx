import React, { ReactNode } from 'react';
import '../App.css';
import RadioComponent from './RadioComponent';
import LabelComponent from './LabelComponent';
import styled from 'styled-components';


//ラベルラジオボタンの基本スタイル
const LabelRadioDiv = styled.div<{ gap?: string, }>`
  display:flex;
  text-align: left;
  width: auto;
  align-items: center;
  gap: ${({ gap }) => (gap ?? "")};
`;

//引数の型
type propsType = {
    title: ReactNode,
    value: string,
    selectedValue: string,
    htmlForId: string,
    onChange: (e: string) => void,
    key: string,
    width?: string,
    disabled?: boolean,
    isTitlePositionRight?: boolean,
    gap?: string,
}


function LabelRadioComponent(props: propsType) {

    return (
        <LabelRadioDiv
            gap={props.gap}
        >
            {
                props.isTitlePositionRight ?
                    <React.Fragment>
                        <RadioComponent
                            {...props}
                        />
                        <LabelComponent
                            {...props}
                        />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <LabelComponent
                            {...props}
                        />
                        <RadioComponent
                            {...props}
                        />
                    </React.Fragment>
            }
        </LabelRadioDiv>
    );
}

export default LabelRadioComponent;