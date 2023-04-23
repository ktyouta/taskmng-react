import '../App.css';
import './css/MasterEdit.css';
import MasterEditFooter from './MasterEditFooter';
import useMasterEditLogic from './Hook/useMasterEditLogic';
import MasterInputComponent from './MasterInputComponent';
import { useAtomValue } from 'jotai';
import { selectedMasterNmAtom } from './Master';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';

function MasterEdit() {

  console.log("masteredit render");

  //MasterEditコンポーネントのビジネスロジック
  const {
    refInfoArray,
    buttonTitle,
    selectedMasterNm,
    isLoading,
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
          <MasterInputComponent refInfoArray={refInfoArray} />
        </div>
      </div>
      <div className="masteredit-footer-area">
        <MasterEditFooter
          buttonTitle={buttonTitle}
          backPageButtonFunc={backPageButtonFunc}
          runButtonFunc={runButtonFunc}
          clearButtonFunc={clearButtonFunc}
        />
      </div>
      {
        isLoading && (
          <div className="loading-area">
            <Loading />
          </div>
        )
      }

    </div>
  );
}

export default MasterEdit;