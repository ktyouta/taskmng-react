import '../App.css';
import MasterEditFooter, { buttonObjType } from '../Master/MasterEditFooter';
import useMasterEditLogic from '../Master/Hook/useMasterEditLogic';
import MasterInputComponent from '../Master/MasterInputComponent';
import LabelComponent from '../Common/LabelComponent';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import WaitLoading from '../Common/WaitLoading';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import { refInfoType } from '../Common/Type/CommonType';
import './css/TaskEditForm.css';


//引数の型
type propsType = {
    refInfoArray: refInfoType[],
    updErrMessage: string,
    isLoading: boolean,
    backPageButtonObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
}


function TaskEditForm(props: propsType) {

    console.log("TaskEditForm render");

    return (
        <div className="taskedit">
            <div className="taskedit-header-area">
                <LabelComponent
                    title="タスク編集"
                    width="100%"
                />
            </div>
            <div className="taskedit-main-area">
                <div className="taskedit-input-main-area">
                    {/* 入力欄 */}
                    <MasterInputComponent
                        refInfoArray={props.refInfoArray}
                    />
                </div>
                {/* エラーメッセージ用スナックバー */}
                <SnackbarComponent
                    open={!!props.updErrMessage}
                    message={props.updErrMessage}
                    severity='error'
                />
            </div>
            <div className="taskedit-footer-area">
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

export default TaskEditForm;