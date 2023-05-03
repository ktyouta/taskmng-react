import '../App.css';
import '../Master/css/MasterEdit.css';
import useAddMasterData from './Hook/useAddMasterData';
import { inputMasterSettingType } from '../Common/Type/CommonType';
import AddMasterForm from '../Common/AddMasterForm';


//引数の型
type propsType = {
    inputMasterSetting: inputMasterSettingType[] | undefined
}


function AddMasterData(props: propsType) {

    console.log("AddMasterData render");

    //AddMasterDataコンポーネントのビジネスロジック
    const {
        addDataInputRefArray,
        isLoading,
        updErrMessage,
        backPageButtonObj,
        negativeButtonObj,
        positiveButtonObj, } = useAddMasterData({ inputsSettingList: props.inputMasterSetting });

    return (
        <AddMasterForm
            refInfoArray={addDataInputRefArray}
            updErrMessage={updErrMessage}
            title={'新規追加データ入力'}
            isLoading={isLoading}
            backPageButtonObj={backPageButtonObj}
            negativeButtonObj={negativeButtonObj}
            positiveButtonObj={positiveButtonObj}
        />
    );
}

export default AddMasterData;