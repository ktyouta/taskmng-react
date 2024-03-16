import '../App.css';
import WaitLoading from '../Common/WaitLoading';
import './css/TaskEdit.css';
import TaskEditForm from './TaskEditForm';
import useTaskRegister from './Hook/useTaskRegister';
import TaskRegisterFooter from './TaskRegisterFooter';
import Loading from '../Common/Loading';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import LabelComponent from '../Common/LabelComponent';
import { BoldSpan, HeaderDiv, HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';


//引数の型
type propsType = {
  closeFn?: () => void,
}


function TaskRegister(props: propsType) {

  console.log("TaskRegister render");

  const {
    refInfoArray,
    isUpDelLoading,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj,
    errMessage, } = useTaskRegister({ ...props });

  //ローディング
  if (!refInfoArray || !refInfoArray.default || !refInfoArray.customAttribute) {
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
            title="タスク作成"
          />
        </HeaderDiv>
        <VerticalFlowDiv
          height='85%'
        >
          {/* デフォルト属性 */}
          {
            refInfoArray &&
            refInfoArray.default &&
            refInfoArray.default.length > 0 &&
            <TaskEditForm
              refInfoArray={refInfoArray.default}
              errMessage={errMessage}
              outerHeight='auto'
            />
          }
          {/* カスタム属性 */}
          {
            refInfoArray &&
            refInfoArray.customAttribute &&
            refInfoArray.customAttribute.length > 0 &&
            <React.Fragment>
              <HorizonLabelItemComponent
                title={<BoldSpan>カスタム属性</BoldSpan>}
                marginLt='15%'
                width="20%"
              >
              </HorizonLabelItemComponent>
              <TaskEditForm
                refInfoArray={refInfoArray.customAttribute}
                errMessage={errMessage}
                outerHeight='auto'
              />
            </React.Fragment>
          }
        </VerticalFlowDiv>
      </HeightDiv>
      <HeightDiv
        height='15%'
      >
        <TaskRegisterFooter
          backPageButtonObj={backPageButtonObj}
          negativeButtonObj={negativeButtonObj}
          positiveButtonObj={positiveButtonObj}
          outerHeight='15%'
        />
      </HeightDiv>
      {/* ローディング */}
      {
        isUpDelLoading &&
        <WaitLoading />
      }
    </HeightDiv>
  );
}

export default TaskRegister;