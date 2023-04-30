import '../App.css';
import './css/MasterEdit.css';
import MasterEditFooter from './MasterEditFooter';
import useMasterEditLogic from './Hook/useMasterEditLogic';
import MasterInputComponent from './MasterInputComponent';
import { useAtomValue } from 'jotai';
import { selectedMasterNmAtom } from './Master';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import WaitLoading from '../Common/WaitLoading';


function MasterEdit() {

  console.log("masteredit render");

  //MasterEditコンポーネントのビジネスロジック
  const {
    refInfoArray,
    buttonTitle,
    selectedMasterNm,
    isLoading,
    updErrMessage,
    backPageButtonFunc,
    runButtonFunc,
    clearButtonFunc } = useMasterEditLogic();

  return (
    <div className="masteredit">
      <div className="masteredit-header-area">
        <LabelComponent
          title={`マスタ名：${selectedMasterNm}`}
          width="100%"
        />
      </div>
      <div className="masteredit-main-area">
        <div className="masteredit-input-main-area">
          {/* 入力欄 */}
          <MasterInputComponent refInfoArray={refInfoArray} />
        </div>
        {/* エラーメッセージ用スナックバー */}
        <SnackbarComponent
          open={!!updErrMessage}
          message={updErrMessage}
          severity='error'
        />
      </div>
      <div className="masteredit-footer-area">
        {/* 編集画面用フッター */}
        <MasterEditFooter
          buttonTitle={buttonTitle}
          backPageButtonFunc={backPageButtonFunc}
          runButtonFunc={runButtonFunc}
          clearButtonFunc={clearButtonFunc}
        />
      </div>
      {/* ローディング */}
      <WaitLoading
        isLoading={isLoading}
      />
    </div>
  );
}

export default MasterEdit;