import '../App.css';
import '../Master/css/MasterEdit.css';
import MasterEditFooter, { buttonObjType } from '../Master/MasterEditFooter';
import LabelComponent from '../Common/LabelComponent';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import WaitLoading from '../Common/WaitLoading';
import { refInfoType } from './Type/CommonType';
import DynamicForm from './DynamicForm';


//引数の型
type propsType = {
    refInfoArray: refInfoType[],
    updErrMessage: string,
    title: string,
    isLoading: boolean,
    backPageButtonObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
}


function AddMasterForm(props: propsType) {

    console.log("AddMasterForm render");

    return (
        <div className="masteredit">
            <div className="masteredit-header-area">
                <LabelComponent
                    title={props.title}
                    width="100%"
                />
            </div>
            <div className="masteredit-main-area">
                <div className="masteredit-input-main-area">
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
            <div className="masteredit-footer-area">
                {/* 編集画面用フッター */}
                <MasterEditFooter
                    backPageButtonObj={props.backPageButtonObj}
                    negativeButtonObj={props.negativeButtonObj}
                    positiveButtonObj={props.positiveButtonObj}
                />
            </div>
            {/* ローディング */}
            <WaitLoading
                isLoading={props.isLoading}
            />
        </div>
    );
}

export default AddMasterForm;