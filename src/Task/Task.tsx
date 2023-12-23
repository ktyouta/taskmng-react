import React, { useState } from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, atom, useAtomValue } from 'jotai';
import TaskTop from './TaskTop';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import ENV from '../env.json';
import TaskMain from './TaskMain';
import useTask from './Hook/useTask';
import TaskDetail from './TaskDetail';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';

type propsType = {
  path: string,
}

function Task(props: propsType) {

  console.log("Task render");

  const {
    detailRoutingId,
    backPageFunc,
  } = useTask({ ...props });

  return (
    <HeightDiv
      height='100%'
    >
      <Routes>
        <Route path="/" element={<TaskMain />} />
        {/* タスク詳細画面のルーティング */}
        {
          detailRoutingId &&
          <React.Fragment>
            {
              (() => {
                switch (detailRoutingId) {
                  case "ZZZ":
                    return <Route
                      key={"*"}
                      path="*"
                      element={
                        <NotFoundComponent
                          backUrl={props.path}
                        />
                      }
                    />
                  default:
                    return <Route
                      path={detailRoutingId}
                      element={
                        <TaskDetail
                          updTaskId={detailRoutingId}
                          closeFn={backPageFunc}
                        />
                      }
                    />
                }
              })()
            }
          </React.Fragment>
        }
      </Routes>
    </HeightDiv>
  );
}

export default Task;