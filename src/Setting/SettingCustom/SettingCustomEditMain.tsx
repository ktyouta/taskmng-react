import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    width: 100%;
    height: ${({ height }) => (height)};
`;

const MainDiv = styled.div`
    height: 100%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 2%;
`;

//引数の型
type propsType = {
    outerHeight: string,
}


function SettingCustomEditMain(props: propsType) {

    console.log("SettingCustomMain render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                <HorizonLabelItemComponent
                    title={'カスタム属性の名称'}
                >
                    <BaseInputComponent
                        value=""
                        lenght={50}
                    //disabled={element.disabled}
                    //bgColor={bgColor}
                    />
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'カスタム属性の説明'}
                >
                    <BaseInputComponent
                        value=""
                        lenght={50}
                    //disabled={element.disabled}
                    //bgColor={bgColor}
                    />
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'カスタム属性の形式'}
                >
                    
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'属性の設定'}
                >
                    
                </HorizonLabelItemComponent>
            </MainDiv>
        </OuterDiv>
    );
}

export default SettingCustomEditMain;