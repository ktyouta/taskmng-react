import '../App.css';
import '../Master/css/MasterEdit.css';
import useAddMasterSummary from './Hook/useAddMasterSummary';
import { inputAddMasterSettingType } from '../Common/Type/CommonType';
import AddMasterSummaryForm from './AddMasterSummaryForm';


//引数の型
type propsType = {
  addMasterSummarySetting: inputAddMasterSettingType[] | undefined
}


function AddMasterSummary(props: propsType) {

  console.log("AddMasterSummary render");

  //MasterEditコンポーネントのビジネスロジック
  const {
    summaryInputRefArray,
    negativeButtonObj,
    positiveButtonObj,} = useAddMasterSummary({ addMasterSummarySetting: props.addMasterSummarySetting });

  return (
    <AddMasterSummaryForm
      refInfoArray={summaryInputRefArray}
      title='新規マスタ概要入力'
      updErrMessage={''}
      negativeButtonObj={negativeButtonObj}
      positiveButtonObj={positiveButtonObj}
    />
  );
}

export default AddMasterSummary;