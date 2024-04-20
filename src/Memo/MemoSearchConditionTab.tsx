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
import { TabComponent, tabType } from '../Common/TabComponent';


//引数の型
type propsType = {
    searchConditionComponent: tabType[] | undefined
}


function MemoSearchConditionTab(props: propsType) {

    console.log("MemoSearchConditionTab render");

    return (
        <React.Fragment>
            {
                props.searchConditionComponent &&
                <TabComponent
                    tabObj={props.searchConditionComponent}
                />
            }
        </React.Fragment>
    );
}

export default MemoSearchConditionTab;