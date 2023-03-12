import { useContext } from 'react';
import '../App.css';
import TableComponent from '../Common/TableComponent';
import '../Master/css/MasterTop.css';
import ButtonComponent from '../Common/ButtonComponent';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import { selectedMasterDataType } from '../Common/Type/CommonType';
import '../Master/css/MasterTableComponent.css';
import MessageComponent, { labelType } from '../Common/MessageComponent';
import SpaceComponent from '../Common/SpaceComponent';
import { masterDataListType } from '../Main/Main';
import useTopTableComponentLogic from './Hook/useTopTableComponentLogic';
import ResultNumComponent from '../Common/ResultNumComponent';
import ModalComponent from '../Common/ModalComponent';
import LoadingTableComponent from '../Common/LoadingTableComponent';
import TopModalTable from './TopModalTable';


//引数の型
type propsType = {
    masterDataList: masterDataListType[]
}

function TopTableComponent(props: propsType) {

    console.log("mastertablecomponent render");

    //MasterTableComponentコンポーネントのビジネスロジック
    const {
        tableHeader,
        masterTableBody,
        textRef,
        reamarksRef,
        isDisplayMessage,
        resultNum,
        flag,
        masterTableHeader,
        selectMasterNm,
        selectedMasterBody,
        isLoading,
        isError,
        clickSearchBtn,
        clickClearBtn,
        offFlag
    } = useTopTableComponentLogic({ tableBody: props.masterDataList, orgTableBody: props.masterDataList });

    return (
        <div className="mastertablecomponent">
            <div className="mastertablecomponent-search-area">
                <HorizonLabelInputComponent
                    title={"ファイル名"}
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
            <LoadingTableComponent
                isLoading={tableHeader.length < 0 || masterTableBody.length < 0}
                isError={isError}
                tableHeight="310px"
                tableHeader={tableHeader}
                tableBody={masterTableBody}
            />
            <ModalComponent
                component={
                    <TopModalTable
                        isLoading={isLoading}
                        isError={isError}
                        tableHeight="310px"
                        selectMasterNm={selectMasterNm}
                        tableHeader={masterTableHeader}
                        tableBody={selectedMasterBody ?? []}
                    />
                }
                modalIsOpen={flag}
                closeModal={offFlag}
            />
        </div>
    );
}

export default TopTableComponent;