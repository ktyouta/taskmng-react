import '../App.css';
import './css/MasterEdit.css';
import MasterEditFooter from './MasterEditFooter';
import useMasterEditLogic from './Hook/useMasterEditLogic';
import MasterInputComponent from './MasterInputComponent';

function MasterEdit() {

  console.log("masteredit render");

  //MasterEditコンポーネントのビジネスロジック
  const { refInfoArray, buttonTitle, backPageButtonFunc, runButtonFunc, clearButtonFunc } = useMasterEditLogic();

  return (
    <div className="masteredit">
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
    </div>
  );
}

export default MasterEdit;