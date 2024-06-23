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
import BarGraphComponent from '../Common/BarGraphComponent';
import SideStackBarGraphComponent from '../Common/SideStackBarGraphComponent';
import useHomeStatusBarGraph from './Hook/useHomeStatusBarGraph';



//引数の型
type propsType = {
    taskList: taskHistoryType[],
    selectYear: string,
    selectState: string,
}


function HomeStatusBarGraph(props: propsType) {

    console.log("HomeStatusBarGraph render");

    const {
        barTaskList
    } = useHomeStatusBarGraph({ ...props });

    return (
        <SideStackBarGraphComponent
            list={barTaskList}
            xKey={'状態'}
            yKey={''}
            graphWidth={483}
            graphHeight={200}
            outerWidth={''}
            outerHeight={''}
            backgroundColor='white'
        />
    );
}

export default HomeStatusBarGraph;