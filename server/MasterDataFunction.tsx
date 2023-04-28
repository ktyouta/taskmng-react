import { authenticate } from "./AuthFunction";
import { JSONEXTENSION, MASTERFILEPATH } from "./Constant";
import { checkFile, overWriteData, readFile } from "./FileFunction";
import { authInfoType } from "./Type/type";

/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddMasterData(fileDataObj: { master: { [key: string]: any }[] }, registData: { [key: string]: any })
    : { master: { [key: string]: any }[] } {
    //IDを取得
    let id = fileDataObj.master[fileDataObj.master.length - 1]['id'];
    registData['id'] = `${parseInt(id) + 1}`;
    fileDataObj.master.push(registData);
    return fileDataObj;
}

/**
 * マスタデータ登録更新用
 * @param res 
 * @param req 
 * @param regstFunction 
 * @returns 
 */
export function runRegister(res: any,
    req: any,
    regstFunction: (fileDataObj: { master: { [key: string]: any }[] }, registData: { [key: string]: any }) => { master: { [key: string]: any }[] }) {
    try {
        //認証権限チェック
        let authResult = checkUpdAuth(req.cookies.cookie);
        if (authResult.errMessage) {
            return res
                .status(authResult.status)
                .json({ errMessage: authResult.errMessage });
        }

        //登録するファイルのパスを取得
        let filePath = `${MASTERFILEPATH}${req.body["masternm"]}${JSONEXTENSION}`;
        //ファイルの存在チェック
        if (!checkFile(filePath)) {
            return res
                .status(400)
                .json({ errMessage: 'ファイルが存在しません。' });
        }

        //登録に不要なプロパティ(マスタ名)を削除
        delete req.body["masternm"];

        //引数で受け取った登録更新用データ作成メソッドを呼び出す
        let tmpFileDataObj = regstFunction(JSON.parse(readFile(filePath)), req.body);

        // データを登録
        let errMessage = overWriteData(filePath, JSON.stringify(tmpFileDataObj, null, '\t'));

        //登録に失敗
        if (errMessage) {
            return res
                .status(400)
                .json({ errMessage: '登録に失敗しました。' });
        }
        return res
            .status(200)
            .json({ errMessage: '登録が完了しました。' });

    }
    catch (e) {
        console.log(`e:${e}`);
        return res
            .status(500)
            .json({ errMessage: '予期しないエラーが発生しました。' });
    }
}

/**
 * 登録更新削除前認証チェック
 */
function checkUpdAuth(cookie: any): authInfoType {
    let tmpAuthInfo = {
        status: 200,
        errMessage: "",
    }
    //認証チェック
    let authResult = authenticate(cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //ファイルの更新権限チェック
    if (!authResult || !authResult.userInfo || parseInt(authResult.userInfo.auth) < 2) {
        return tmpAuthInfo = { status: 400, errMessage: `権限がありません。` };
    }

    return tmpAuthInfo;
}
