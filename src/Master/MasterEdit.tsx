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
import AddMasterForm from '../Common/AddMasterForm';


function MasterEdit() {

  console.log("masteredit render");

  //MasterEditコンポーネントのビジネスロジック
  const {
    refInfoArray,
    title,
    isLoading,
    updErrMessage,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj, } = useMasterEditLogic();

  return (
    <AddMasterForm
      refInfoArray={refInfoArray}
      updErrMessage={updErrMessage}
      title={title}
      isLoading={isLoading}
      backPageButtonObj={backPageButtonObj}
      negativeButtonObj={negativeButtonObj}
      positiveButtonObj={positiveButtonObj}
    />
  );
}

export default MasterEdit;