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
import IconComponent from '../Common/IconComponent';
import { RxCross1 } from 'react-icons/rx';


//引数の型
type propsType = {
  closeFn?: () => void,
}

//ヘッダータイトルのスタイル
const HeaderTitleDiv = styled.div`
  width: 100%;
  height: 76%;
  background: linear-gradient(to right, #3f86ed, #4481eb, #04befe, #3f86ed);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  padding-left: 1%;
  border-radius: 9px;
  position:relative;
`;

//ヘッダー
const TaskHeaderDiv = styled(HeaderDiv) <{ height: string | undefined }>`
  padding-left:1%;
  height:${({ height }) => (height)};
  box-sizing:border-box;
  font-size:18px;
`;

//フォーム
const TaskFormAreaDiv = styled.div<{ height: string | undefined }>`
  height:${({ height }) => (height)};
  box-sizing:border-box;
  padding-top:4%;
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
  if (!refInfoArray || !refInfoArray.default || !refInfoArray.customAttribute) {
    return <Loading height='50vh' />;
  }

  return (
    <HeightDiv
      height='100%'
    >
      <TaskHeaderDiv
        height='8%'
      >
        <HeaderTitleDiv>
          タスク作成
          <IconComponent
            icon={RxCross1}
            onclick={props.closeFn}
            style={{
              "text-align": "right",
              "position": "absolute",
              "right": "2%",
            }}
          />
        </HeaderTitleDiv>
      </TaskHeaderDiv>
      <TaskFormAreaDiv
        height='77%'
      >
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
      </TaskFormAreaDiv>
      <HeightDiv
        height='15%'
      >
        <TaskRegisterFooter
          backPageButtonObj={backPageButtonObj}
          negativeButtonObj={negativeButtonObj}
          positiveButtonObj={positiveButtonObj}
          outerHeight='100%'
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