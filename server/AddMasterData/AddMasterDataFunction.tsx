import { checkUpdAuth } from "../Auth/AuthFunction";
import { JSONEXTENSION, MASTERFILEPATH, MASTERTABLEFILENM } from "../Common/Const.tsx/CommonConst";
import { overWriteData, readFile } from "../FileFunction";
import { createAddMasterData } from "../MasterData/MasterDataFunction";

/**
 * 新規マスタ追加
 */
export function runAddMaster(res: any, req: any,) {
    try {
        //認証権限チェック
        let authResult = checkUpdAuth(req.cookies.cookie);
        if (authResult.errMessage) {
            return res
                .status(authResult.status)
                .json({ errMessage: authResult.errMessage });
        }

        //追加ファイルの概要
        let summaryBody: { [key: string]: any } = req.body["summary"];
        //新規追加データ
        let addDataBody: { [key: string]: any } = req.body["data"];
        //新規マスタファイル名を取得
        let newMasterfileNm = summaryBody["value"];
        //mastertableファイルパス
        let mastertableFilePath = `${MASTERFILEPATH}${MASTERTABLEFILENM}${JSONEXTENSION}`;

        //マスタテーブルファイルの読み込み
        let tableData = readFile(mastertableFilePath);
        if (!tableData) {
            return res
                .status(400)
                .json({ errMessage: `テーブルファイルの読み込みに失敗しました。` });
        }
        //マスタテーブルデータ
        let masterTableData: { mastertable: { [key: string]: string }[] } = JSON.parse(tableData);
        //ファイル名の重複チェック
        let duplicationErrMessage = duplicationCheck(masterTableData, newMasterfileNm);
        if (duplicationErrMessage) {
            return res
                .status(400)
                .json({ errMessage: `ファイル名が重複しています。` });
        }

        //mastertableファイルの更新
        //データを追加
        masterTableData = createAddNewMasterData(masterTableData, summaryBody);
        //更新
        let summaryErrMessage = overWriteData(mastertableFilePath, JSON.stringify(masterTableData, null, '\t'));
        if (summaryErrMessage) {
            return res
                .status(400)
                .json({ errMessage: summaryErrMessage });
        }

        //新規データの登録
        let summaryFilePath = `${MASTERFILEPATH}${newMasterfileNm}${JSONEXTENSION}`;
        let newData: { master: { [key: string]: string }[] } = createAddMasterData({ master: [] }, addDataBody);
        //新規ファイル作成とデータの登録
        let addDataErrMessage = overWriteData(summaryFilePath, JSON.stringify(newData, null, '\t'));
        if (addDataErrMessage) {
            return res
                .status(400)
                .json({ errMessage: addDataErrMessage });
        }

        //正常終了
        return res
            .status(200)
            .json({ errMessage: `登録が完了しました。` });

    }
    catch (e) {
        console.log(`e:${e}`);
        return res
            .status(500)
            .json({ errMessage: '予期しないエラーが発生しました。' });
    }
}

/**
 * マスターファイルテーブルの重複チェック
 */
function duplicationCheck(masterTableData: { mastertable: { [key: string]: string }[] }, newMasterfileNm: string) {
    //デコードしたデータの型チェック
    if (!('mastertable' in masterTableData) || typeof masterTableData.mastertable !== 'object') {
        return `テーブルファイルが壊れています。`;
    }
    let errMessage = "";
    masterTableData.mastertable.some(element => {
        //ファイル名が重複している場合は新規作成不可
        if (element.value === newMasterfileNm) {
            errMessage = `ファイル名が重複しています。`;
            return true;
        }
    });
    return errMessage;
}

/**
 * マスタテーブルファイル登録用データを作成
 * @param masterTableData 
 * @param summaryBody 
 * @returns 
 */
function createAddNewMasterData(masterTableData: { mastertable: { [key: string]: string }[] }, summaryBody: { [key: string]: any }) {
    masterTableData.mastertable.push(summaryBody);
    return masterTableData;
}