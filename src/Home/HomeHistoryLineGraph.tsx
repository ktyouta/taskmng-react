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
import useHomeHistoryLineGraph from './Hook/useHomeHistoryLineGraph';
import MultiLineGraphComponent from '../Common/MultiLineGraphComponent';


//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    overflow: auto;
    overflow-x: hidden;
    margin-left: auto;
    margin-right: auto;
`;


//引数の型
type propsType = {
    taskList: taskHistoryType[],
    selectYear: string,
    height: string,
    width: string,
}


function HomeHistoryLineGraph(props: propsType) {

    console.log("HomeHistoryLineGraph render");

    const {
        lineTaskList
    } = useHomeHistoryLineGraph({ ...props });

    return (
        <React.Fragment>
            <OuterDiv
                height={props.height}
                width={props.width}
            >
                <MultiLineGraphComponent
                    list={lineTaskList}
                    xKey={'name'}
                    yKey={''}
                    graphWidth={100}
                    graphHeight={100}
                    outerWidth={'100%'}
                    outerHeight={'90%'}
                    xLabel='月'
                    yLabel='作業件数'
                    backgroundColor='white'
                    strokeSizeList={{
                        総数: 3
                    }}
                    fillColors={{
                        総数: '#9370db'
                    }}
                />
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeHistoryLineGraph;