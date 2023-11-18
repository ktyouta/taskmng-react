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


//引数の型
type propsType = {
  closeFn?: () => void,
}

//太文字のスタイル
const BoldSpan = styled.span`
    font-weight: bold;
`;

//ヘッダー
const HeaderDiv = styled.div`
    height: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

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
  if (!refInfoArray || !refInfoArray.default && !refInfoArray.customAttribute) {
    return <Loading height='50vh' />;
  }

  return (
    <div className="taskedit">
      <HeaderDiv>
        <LabelComponent
          title="タスク作成"
        />
      </HeaderDiv>
      {
        refInfoArray &&
        refInfoArray.default &&
        refInfoArray.default.length > 0 &&
        <TaskEditForm
          refInfoArray={refInfoArray.default}
          isUpDelLoading={isUpDelLoading}
          errMessage={errMessage}
          outerHeight='85%'
        />
      }
      {
        refInfoArray &&
        refInfoArray.customAttribute &&
        refInfoArray.customAttribute.length > 0 &&
        <React.Fragment>
          <HorizonLabelItemComponent
            title={<BoldSpan>カスタム属性</BoldSpan>}
            width="20%"
          >
          </HorizonLabelItemComponent>
          <TaskEditForm
            refInfoArray={refInfoArray.customAttribute}
            isUpDelLoading={isUpDelLoading}
            errMessage={errMessage}
            outerHeight='85%'
          />
        </React.Fragment>
      }
      <TaskRegisterFooter
        backPageButtonObj={backPageButtonObj}
        negativeButtonObj={negativeButtonObj}
        positiveButtonObj={positiveButtonObj}
        outerHeight='15%'
      />
      {/* ローディング */}
      <WaitLoading
        isLoading={isUpDelLoading}
      />
    </div >
  );
}

export default TaskRegister;