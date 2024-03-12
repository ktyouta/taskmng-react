import '../App.css';
import './css/TaskEdit.css';
import TaskEditForm from './TaskEditForm';
import { refInfoType } from '../Common/Type/CommonType';
import useTaskCondition from './Hook/useTaskCondition';
import TaskConditionFooter from './TaskConditionFooter';
import Loading from '../Common/Loading';
import LabelComponent from '../Common/LabelComponent';
import styled from 'styled-components';
import { BoldSpan, HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import { taskSearchConditionRefType } from './Type/TaskType';
import { TabComponent, tabType } from '../Common/TabComponent';


//引数の型
type propsType = {
    searchConditionComponent: tabType[] | undefined
}


function TaskSearchConditionTab(props: propsType) {

    console.log("TaskSearchConditionTab render");

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

export default TaskSearchConditionTab;