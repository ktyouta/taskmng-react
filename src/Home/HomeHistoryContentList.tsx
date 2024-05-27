import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import useHomeWorkHistory from './Hook/useHomeWorkHistory';
import styled from 'styled-components';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import ENV from '../env.json';
import CenterLoading from '../Common/CenterLoading';
import AccordionComponent from '../Common/AccordionComponent';
import ButtonComponent from '../Common/ButtonComponent';
import Table from '../Common/Table';
import HomeHistoryContent from './HomeHistoryContent';
import useHomeHistory from './Hook/useHomeHistory';
import { taskHistoryType } from './Type/HomeType';


//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    overflow: auto;
    overflow-x: hidden;
`;

//内側のスタイル
const InnerDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
`;

//引数の型
type propsType = {
    taskList: taskHistoryType[]
}

function HomeHistoryContentList(props: propsType) {

    console.log("HomeHistoryList render");

    return (
        <OuterDiv
            height="90%"
            width="40%"
        >
            <InnerDiv
                height="90%"
                width="40%"
            >
                {
                    props.taskList && props.taskList.map((element) => {
                        return <HomeHistoryContent
                            taskHistory={element}
                        />
                    })
                }
            </InnerDiv>
        </OuterDiv>
    );
}

export default HomeHistoryContentList;