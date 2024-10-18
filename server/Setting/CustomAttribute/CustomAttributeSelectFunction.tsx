import { USER_AUTH } from "../../Auth/Const/AuthConst";
import { authInfoType } from "../../Auth/Type/AuthType";
import { getFileJsonData } from "../../Common/FileFunction";
import { comboType, inputSettingType } from "../../Common/Type/CommonType";
import { getSearchConditionList } from "../SearchCondition/SearchConditionSelectFunction";
import { searchConditionType } from "../SearchCondition/Type/SearchConditionType";
import { CUSTOM_ATTRIBUTE_FILEPATH, CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, PRE_CUSTOMATTRIBUTELIST_ID, PRE_CUSTOMATTRIBUTE_ID } from "./Const/CustomAttributeConst";
import { customAttributeListType, customAttributeType, resClientCustomAttributeType, selectElementListType } from "./Type/CustomAttributeType";



/**
 * カスタム属性リストを取得
 */
export function getCustomAttributeData() {

    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //削除済のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * カスタム属性選択リストを取得
 */
export function getCustomAttributeListData() {

    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);

    //削除済のデータをフィルターする
    calDecodeFileData = calDecodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return calDecodeFileData;
}


/**
 * ファイルから取得したカスタム属性を画面返却用に変換
 * @param decodeFileData カスタム属性リスト
 * @param id カスタム属性ID
 * @param res 
 * @returns 
 */
export function convertCustomAttribute(singleCustomAttributeData: customAttributeType)
    : resClientCustomAttributeType {

    let clientCustomAttributeObj: resClientCustomAttributeType = {
        id: "",
        name: "",
        type: "",
        required: false,
        selectElementListId: "",
        registerTime: "",
        updTime: "",
        userId: "",
        deleteFlg: "",
        description: "",
        length: "",
        auth: ""
    }

    Object.keys(clientCustomAttributeObj).forEach((key) => {
        if (!singleCustomAttributeData[key]) {
            return;
        }
        clientCustomAttributeObj[key] = singleCustomAttributeData[key];
    });

    return clientCustomAttributeObj;
}


/**
 * カスタム属性を選択リストと結合する
 * @param decodeFileData カスタム属性リスト
 * @returns 
 */
export function joinCustomAttributeSelectList(singleCustomAttributeData: resClientCustomAttributeType)
    : resClientCustomAttributeType {

    //選択リストを所持している場合はリストと結合する
    if (!singleCustomAttributeData.selectElementListId) {
        return singleCustomAttributeData;
    }

    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getCustomAttributeListData();
    //選択リストのIDで絞り込み
    let filterdCalDate: selectElementListType[] = calDecodeFileData
        .filter((element) => {
            return element.id === singleCustomAttributeData?.selectElementListId
        })
        .map((element) => {
            return {
                no: element.no,
                value: element.content
            }
        });

    singleCustomAttributeData.selectElementList = filterdCalDate;

    return singleCustomAttributeData;
}


/**
 * 入力設定を画面入力用に変換する
 * @param decodeFileData カスタム属性リスト
 * @param id カスタム属性ID
 * @param res 
 * @returns 
 */
export function joinCustomAttributeList(customAttributeList: customAttributeType[],
    customAttributeSelectList: customAttributeListType[])
    : inputSettingType[] {

    let retCustomAttributeList: inputSettingType[] = [];

    customAttributeList.forEach((element) => {

        //カスタム属性のIDからリストを取得
        let tmpSelectList: comboType[] = [];

        customAttributeSelectList.filter((element1) => {
            return element1.id === element.selectElementListId;
        }).forEach((element2) => {
            tmpSelectList.push({
                label: element2.content,
                value: element2.no,
            });
        });

        retCustomAttributeList.push({
            id: element.id,
            name: element.name,
            type: element.type,
            length: element.length,
            disabled: false,
            visible: true,
            value: "",
            selectList: tmpSelectList,
            description: element.description,
            isRequired: element.required,
        });
    });

    return retCustomAttributeList;
}


/**
 * カスタム属性のIDを作成
 */
export function createCustomAttributeNewId(customAttributeList: customAttributeType[]) {
    //IDが最大のNOを取得
    let maxNo = customAttributeList.reduce<number>((prev: number, current: customAttributeType) => {
        let currentNm = parseInt(current.id.replace(`${PRE_CUSTOMATTRIBUTE_ID}`, ""));
        return Math.max(prev, currentNm);
    }, 0);
    return `${PRE_CUSTOMATTRIBUTE_ID}${maxNo + 1}`;
}


/**
 * カスタム属性の選択リストのIDを作成
 * @param calDecodeFileData 
 */
export function createCustomAttributeSelectListNewId(calDecodeFileData: customAttributeListType[]) {
    //IDが最大のNOを取得
    let maxNo = calDecodeFileData.reduce<number>((prev: number, current: customAttributeListType) => {
        let currentNm = parseInt(current.id.replace(`${PRE_CUSTOMATTRIBUTELIST_ID}`, ""));
        return Math.max(prev, currentNm);
    }, 0);
    return `${PRE_CUSTOMATTRIBUTELIST_ID}${maxNo + 1}`;
}


/**
 * カスタム属性の選択リストのNOを作成
 * @param calDecodeFileData 
 */
export function createCustomAttributeSelectListNewNo(calDecodeFileData: customAttributeListType[], id: string,) {
    //IDが最大のNOを取得
    let maxNo = calDecodeFileData
        .filter((element) => { return element.id === id })
        .reduce<number>((prev: number, current: customAttributeListType) => {
            let currentNm = parseInt(current.no);
            return Math.max(prev, currentNm);
        }, 0);
    return `${PRE_CUSTOMATTRIBUTELIST_ID}${maxNo + 1}`;
}

/**
 * カスタム属性の権限を取得する
 * @param decodeFileData カスタム属性リスト
 * @returns 
 */
export function getCustomAttributeAuth(singleCustomAttributeData: resClientCustomAttributeType)
    : resClientCustomAttributeType {

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //検索設定ファイルから権限を取得
    singleCustomAttributeData.auth = searchConditionList.find((element) => {
        return element.id === singleCustomAttributeData.id;
    })?.auth ?? "";

    return singleCustomAttributeData;
}

/**
 * カスタム属性のリストを権限でフィルターする
 */
export function getCustomAttributeByUserAuth(
    customAttributeList: customAttributeType[],
    filterdSearchConditionList: searchConditionType[]
) {

    return customAttributeList.filter((element) => {

        //権限でフィルターした検索条件リストに存在する入力項目を取得する
        let elementAuth = filterdSearchConditionList.find((item) => {
            return item.id === element.id;
        });

        return elementAuth;
    });
}