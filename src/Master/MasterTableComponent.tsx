import { useContext } from 'react';
import '../App.css';
import TableComponent from '../Common/TableComponent';
import { selectedDataAtom } from './Master';
import './css/MasterTop.css';
import ButtonComponent from '../Common/ButtonComponent';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import { selectedMasterDataType } from '../Common/Type/CommonType';
import useMasterTableComponentLogic from './Hook/useMasterTableComponentLogic';
import './css/MasterTableComponent.css';
import MessageComponent, { labelType } from '../Common/MessageComponent';
import SpaceComponent from '../Common/SpaceComponent';
import ResultNumComponent from '../Common/ResultNumComponent';
import { useAtomValue, useSetAtom } from 'jotai';


//引数の型
type propsType = {
    selectedMasterBody: selectedMasterDataType[] | undefined
}

function MasterTableComponent(props: propsType) {

    console.log("mastertablecomponent render");

    //テーブルで選択したデータ
    const setSelectedData = useSetAtom(selectedDataAtom);

    //MasterTableComponentコンポーネントのビジネスロジック
    const { tableHeader, masterTableBody, textRef, reamarksRef, isDisplayMessage, resultNum, clickSearchBtn, clickClearBtn } = useMasterTableComponentLogic({ tableBody: props.selectedMasterBody });

    return (
        <div className="mastertablecomponent">
            <div className="mastertablecomponent-search-area">
                <HorizonLabelInputComponent
                    title={"名称"}
                    value={""}
                    lenght={100}
                    editFlg={true}
                    ref={textRef}
                    titleWidth={"100px"}
                />
                <SpaceComponent space={"3%"} />
                <HorizonLabelInputComponent
                    title={"備考"}
                    value={""}
                    lenght={100}
                    editFlg={true}
                    ref={reamarksRef}
                    titleWidth={"100px"}
                />
                <SpaceComponent space={"7%"} />
                <ButtonComponent
                    styleTypeNumber="RUN"
                    title={"クリア"}
                    onclick={clickClearBtn}
                />
                <SpaceComponent space={"1%"} />
                <ButtonComponent
                    styleTypeNumber="RUN"
                    title={"フィルター"}
                    onclick={clickSearchBtn}
                />
            </div>
            <div className="mastertablecomponent-message-area">
                <div style={{ width: "75%" }}>
                    {
                        isDisplayMessage && <MessageComponent message={"該当するデータがありません。"} styleTypeNumber={labelType.danger} />
                    }
                </div>
                <SpaceComponent space={"9%"} />
                <ResultNumComponent num={resultNum} />
            </div>
            <TableComponent
                tableHeader={tableHeader}
                tableBody={masterTableBody}
                onclick={setSelectedData}
            />
        </div>
    );
}

export default MasterTableComponent;