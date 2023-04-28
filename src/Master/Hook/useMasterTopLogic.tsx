import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import { editModeAtom, editModeEnum, selectedDataAtom, selectedDataElementsAtom, selectedMasterAtom, selectedMasterNmAtom } from "../Master";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";


//返り値の型
type retType = {
  masterDataList: masterDataListType[],
  selectedMasterBody: selectedMasterDataType[] | undefined,
  selectedMaster: string,
  viewData: () => void,
  createData: () => void,
  updateData: () => void,
  deleteData: () => void,
  changeCombo: (e: string) => void,
}

/**
 * 取得したデータから画面用のユーザー情報を作成
 * @param data 
 * @returns 
 */
function createUserInfo(data: { master: selectedMasterDataType[] }): selectedMasterDataType[] {
  return data.master;
}

/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMasterTopLogic(): retType {

  //ルーティング用
  const navigate = useNavigate();
  //全マスタのリスト(マスタメンテ画面のコンボ用)
  const masterDataList = useGlobalAtomValue(masterDataListAtom);
  //編集モード
  const setEditMode = useSetAtom(editModeAtom);
  //テーブルで選択したデータ
  const setSelectedDataElement = useSetAtom(selectedDataElementsAtom);
  //現在選択(テーブルに表示)しているマスタ
  const [selectedMaster, setSelectedMaster] = useAtom(selectedMasterAtom);
  //現在選択(テーブルに表示)しているマスタの名称
  const setSelectedMasterNm = useSetAtom(selectedMasterNmAtom);
  //テーブルで選択したデータ
  const [selectedData, setSelectedData] = useAtom(selectedDataAtom);


  //マウント時に選択データをクリアする
  useEffect(() => {
    setSelectedData({});
  }, []);

  //jsonデータ取得用url
  let masterJsonUrl = useMemo(() => {
    if (!selectedMaster) {
      return "";
    }
    return `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTER}?filename=${selectedMaster}`;
  }, [selectedMaster]);

  //画面に表示するマスタのボディ
  //選択中のマスタのデータを取得する
  const { data: selectedMasterBody } = useQueryWrapper(
    {
      url: masterJsonUrl,
      callback: createUserInfo
    }
  );

  //マスタのデータを取得して選択行のデータを返却
  const getMasterData = async (url: string) => {
    if (!url) {
      return;
    }
    const res = await fetch(url);
    const data = await res.json();
    let selectedMasterDatas: selectedMasterDataType[] = data.master.filter((element: selectedMasterDataType) => {
      //選択行のデータを抽出
      if (element.id === selectedData.id) {
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
    if (!selectedData || !Object.keys(selectedData).length) {
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
    setSelectedDataElement({});
    //登録モード
    setEditMode(editModeEnum.create);
    navigate(`/master/edit`);
  }

  /**
   * 更新
   */
  async function updateData() {
    if (!selectedData || !Object.keys(selectedData).length) {
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
    if (!selectedData || !Object.keys(selectedData).length) {
      alert("データを選択してください。");
      return;
    }
  }

  /**
   * コンボボックスの切り替えイベント
   */
  function changeCombo(e: string) {
    setSelectedData({});
    setSelectedMaster(e);
    //選択中のマスタの名称を取得
    let tmpSelectedMasterNm = masterDataList.find((element) => {
      return element.value === e;
    });
    if (tmpSelectedMasterNm) {
      setSelectedMasterNm(tmpSelectedMasterNm.label);
    }
  }

  return { masterDataList, selectedMasterBody, selectedMaster, viewData, createData, updateData, deleteData, changeCombo };
}

export default useMasterTopLogic;