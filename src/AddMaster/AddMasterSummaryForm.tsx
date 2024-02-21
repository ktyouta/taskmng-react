import '../App.css';
import './css/AddMasterSummaryForm.css';
import useMasterEditLogic from '../Master/Hook/useMasterEditLogic';
import { useAtomValue } from 'jotai';
import { selectedMasterNmAtom } from '../Master/Master';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import WaitLoading from '../Common/WaitLoading';
import useAddMasterSummary from './Hook/useAddMasterSummary';
import AddMasterTopFooter from './AddMasterTopFooter';
import { buttonObjType, inputAddMasterSettingType, refInfoType } from '../Common/Type/CommonType';
import DynamicForm from '../Common/DynamicForm';


//引数の型
type propsType = {
  refInfoArray: refInfoType[],
  title: string,
  updErrMessage: string,
  negativeButtonObj: buttonObjType,
  positiveButtonObj: buttonObjType,
}


function AddMasterSummaryForm(props: propsType) {

  console.log("AddSummaryMasterForm render");

  return (
    <div className="addmasteredit">
      <div className="addmasteredit-header-area">
        <LabelComponent
          title={props.title}
          width="100%"
        />
      </div>
      <div className="addmasteredit-main-area">
        <div className="addmasteredit-input-main-area">
          {/* 入力欄 */}
          <DynamicForm refInfoArray={props.refInfoArray} />
        </div>
        {/* エラーメッセージ用スナックバー */}
        <SnackbarComponent
          open={!!props.updErrMessage}
          message={props.updErrMessage}
          severity='error'
        />
      </div>
      <div className="addmasteredit-footer-area">
        {/* 編集画面用フッター */}
        <AddMasterTopFooter
          negativeButtonObj={props.negativeButtonObj}
          positiveButtonObj={props.positiveButtonObj}
        />
      </div>
    </div>
  );
}

export default AddMasterSummaryForm;