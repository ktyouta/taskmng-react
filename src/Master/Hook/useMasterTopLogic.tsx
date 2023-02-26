import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { selectedMasterDataType } from "../../Common/Type/CommonType";
import { editModeContext, editModeEnum, selectedDataElementsContext } from "../Master";
import ENV from '../../env.json';

//引数の型
type propsType = {
  selectedMaster: string,
  selectedData: { [key: string]: string | JSX.Element },
  setSelectedData: React.Dispatch<React.SetStateAction<{ [key: string]: string | JSX.Element }>>,
  setSelectedMaster: React.Dispatch<React.SetStateAction<string>>,
}

//返り値の型
type retType = {
  selectedMasterBody: selectedMasterDataType[],
  viewData: () => void,
  createData: () => void,
  updateData: () => void,
  deleteData: () => void,
  changeCombo: (e: string) => void,
}

/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMasterTopLogic(props: propsType): retType {

  //ルーティング用
  const navigate = useNavigate();
  //編集モード
  const { setEditMode } = useContext(editModeContext);
  //テーブルで選択したデータ
  const { setSelectedDataElement } = useContext(selectedDataElementsContext);

  //jsonデータ取得用url
  let masterJsonUrl = useMemo(() => {
    if (!props.selectedMaster) {
      return "";
    }
    return `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMASTER}?filename=${props.selectedMaster}`;
  }, [props.selectedMaster])

  //画面に表示するマスタのボディ
  //選択中のマスタのデータを取得する
  const selectedMasterBody: selectedMasterDataType[] = useFetchJsonData(masterJsonUrl).master;

  //マスタのデータを取得して選択行のデータを返却
  const getMasterData = async (url: string) => {
    if (!url) {
      return;
    }
    const res = await fetch(url);
    const data = await res.json();
    let selectedMasterDatas: selectedMasterDataType[] = data.master.filter((element: selectedMasterDataType) => {
      //選択行のデータを抽出
      if (element.id === props.selectedData.id) {
        return element;
      }
    });
    //該当のデータが取得できなかった場合
    if (!selectedMasterDatas || selectedMasterDatas.length === 0) {
      alert("データの取得に失敗しました。");
      return;
    }
    return selectedMasterDatas[0];
  }

  /**
  * 閲覧
  */
  async function viewData() {
    if (!props.selectedData) {
      alert("データを選択してください。");
      return;
    }
    //選択行のデータを取得
    let selectedMasterDatas: selectedMasterDataType | undefined = await getMasterData(masterJsonUrl);
    if (!selectedMasterDatas) {
      return;
    }
    setSelectedDataElement(selectedMasterDatas);
    //閲覧モード
    setEditMode(editModeEnum.view);
    navigate(`/master/edit`);
  }

  /**
   * 新規登録
   */
  function createData() {
    setSelectedDataElement({ id: "", name: "", remarks: "" });
    //登録モード
    setEditMode(editModeEnum.create);
    navigate(`/master/edit`);
  }

  /**
   * 更新
   */
  async function updateData() {
    if (!props.selectedData) {
      alert("データを選択してください。");
      return;
    }
    //選択行のデータを取得
    let selectedMasterDatas: selectedMasterDataType | undefined = await getMasterData(masterJsonUrl);
    if (!selectedMasterDatas) {
      return;
    }
    setSelectedDataElement(selectedMasterDatas);
    //更新モード
    setEditMode(editModeEnum.update);
    navigate(`/master/edit`);
  }

  /**
   * 削除
   */
  function deleteData() {
    if (!props.selectedData) {
      alert("データを選択してください。");
      return;
    }
  }

  /**
   * コンボボックスの切り替えイベント
   */
  function changeCombo(e: string) {
    props.setSelectedData({});
    props.setSelectedMaster(e);
  }

  return { selectedMasterBody, viewData, createData, updateData, deleteData, changeCombo };
}

export default useMasterTopLogic;