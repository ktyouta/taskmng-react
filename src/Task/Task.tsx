import React, { useState } from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, useAtomValue } from 'jotai';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import ENV from '../env.json';
import TaskMain from './TaskMain';
import useTask from './Hook/useTask';
import TaskDetail from './TaskDetail';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import { DUMMY_ID, TASK_ROOT_PATH } from './Const/TaskConst';
import { authType } from '../Common/Hook/useCheckAuth';


//引数の型
type propsType = {
  path: string,
  testId: string,
  menuId: string,
}

function Task(props: propsType) {

  console.log("Task render");

  const {
    detailRoutingId,
    backPageFunc,
    taskSearchConditionList,
  } = useTask({ ...props });

  return (
    <HeightDiv
      height='100%'
      data-testid={props.testId}
    >
      <Routes>
        <Route
          path={TASK_ROOT_PATH}
          element={
            <TaskMain
              path={props.path}
              taskSearchConditionList={taskSearchConditionList}
            />
          }
        />
        {/* タスク詳細画面のルーティング */}
        {
          detailRoutingId &&
          <React.Fragment>
            {
              (() => {
                switch (detailRoutingId) {
                  case DUMMY_ID:
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