import '../App.css';
import './css/MemoEdit.css';
import MemoEditForm from './MemoEditForm';
import { refInfoType } from '../Common/Type/CommonType';
import useMemoCondition from './Hook/useMemoCondition';
import MemoConditionFooter from './MemoConditionFooter';
import Loading from '../Common/Loading';
import LabelComponent from '../Common/LabelComponent';
import styled from 'styled-components';
import { BoldSpan, HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import { memoSearchConditionRefType } from './Type/MemoType';
import { TabComponent } from '../Common/TabComponent';
import MemoSearchConditionTab from './MemoSearchConditionTab';


//引数の型
type propsType = {
    memoSearchRefInfo: memoSearchConditionRefType,
    closeFn: () => void,
}

//ヘッダー
const HeaderDiv = styled.div`
    height: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;


function MemoCondition(props: propsType) {

    console.log("MemoCondition render");

    const {
        backPageButtonObj,
        negativeButtonObj,
        searchConditionComponent,
    } = useMemoCondition({ ...props });

    //ローディング
    if (!props.memoSearchRefInfo ||
        props.memoSearchRefInfo.default.length === 0) {
        return <Loading height='50vh' />;
    }

    return (
        <HeightDiv
            height='100%'
        >
            <HeightDiv
                height='85%'
            >
                <HeaderDiv>
                    <LabelComponent
                        title="検索条件"
                    />
                </HeaderDiv>
                <HeightDiv
                    height='85%'
                >
                    <MemoSearchConditionTab
                        searchConditionComponent={searchConditionComponent}
                    />
                </HeightDiv>
            </HeightDiv>
            <HeightDiv
                height='15%'
            >
                <MemoConditionFooter
                    backPageButtonObj={backPageButtonObj}
                    negativeButtonObj={negativeButtonObj}
                    outerHeight='15%'
                />
            </HeightDiv>
        </HeightDiv>
    );
}

export default MemoCondition;