import { authenticate } from "./AuthFunction";
import { JSONEXTENSION, MASTERFILEPATH } from "./Constant";
import { checkFile, overWriteData, readFile } from "./FileFunction";
import { authInfoType, methodType } from "./Type/type";

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
 * 更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdMasterData(fileDataObj: { master: { [key: string]: any }[] }, registData: { [key: string]: any })
    : { master: { [key: string]: any }[] } {

    fileDataObj.master.some((element) => {
        //IDの一致するデータを更新
        if (element.id === registData.id) {
            Object.keys(element).forEach((item) => {
                element[item] = registData[item];
            });
            return true;
        }
    });

    return fileDataObj;
}

/**
 * 削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDelMasterData(fileDataObj: { master: { [key: string]: any }[] }, registData: { [key: string]: any })
    : { master: { [key: string]: any }[] } {
    let tmp: { [key: string]: any }[] = [];

    tmp = fileDataObj.master.filter((element) => {
        //IDの一致するデータをフィルター
        return element.id !== registData.id;
    });
    fileDataObj.master = tmp;
    return fileDataObj;
}


/**
 * 更新削除データの存在チェック
 */
function checkExistData(fileDataObj: { master: { [key: string]: any }[] }, registData: { [key: string]: any }) {
    let isExist = false;

    fileDataObj.master.some((element) => {
        //IDの一致するデータを更新
        if (element.id === registData.id) {
            return isExist = true;
        }
    });
    return isExist;
}

/**
 * メソッドからクライアント用のメッセージワードを返却
 */
function getMethodWord(method: methodType) {
    //クライアントメッセージ用
    let updMessage = "";
    switch (method) {
        case "POST":
            updMessage = "登録";
            break;
        case "PUT":
            updMessage = "更新";
            break;
        case "DELETE":
            updMessage = "削除";
            break;
    }
    return updMessage;
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
    regstFunction: (fileDataObj: { master: { [key: string]: any }[] }, registData: { [key: string]: any }) => { master: { [key: string]: any }[] },
    method: methodType = "POST",
    pathPrm: string = ""
) {
    try {
        //認証権限チェック
        let authResult = checkUpdAuth(req.cookies.cookie);
        if (authResult.errMessage) {
            return res
                .status(authResult.status)
                .json({ errMessage: authResult.errMessage });
        }

        //ファイル名
        let fileNm;
        //リクエストボディ
        let body: { [key: string]: any } = {};

        //ファイル名とボディを取得
        if (method === "DELETE") {
            //パスパラメータは、ファイル名/IDの形式で受け取る
            let pathPrmArry = pathPrm.split(`-`);
            if (pathPrmArry.length !== 2) {
                return res
                    .status(400)
                    .json({ errMessage: 'パラメータが不正です。' });
            }
            fileNm = pathPrmArry[0];
            body['id'] = pathPrmArry[1];
        }
        else {
            fileNm = req.body["masternm"];
            //登録に不要なプロパティ(マスタ名)を削除
            delete req.body["masternm"];
            body = req.body;
        }

        //登録するファイルのパスを取得
        let filePath = `${MASTERFILEPATH}${fileNm}${JSONEXTENSION}`;
        //ファイルの存在チェック
        if (!checkFile(filePath)) {
            return res
                .status(400)
                .json({ errMessage: 'ファイルが存在しません。' });
        }

        //クライアントメッセージ用
        let updMessage = getMethodWord(method);

        //更新削除の場合は対象データの存在チェックを行う
        if ((method === "PUT" || method === "DELETE") && !checkExistData(JSON.parse(readFile(filePath)), body)) {
            return res
                .status(400)
                .json({ errMessage: `${updMessage}対象のデータが存在しません。` });
        }

        //引数で受け取った登録更新用データ作成メソッドを呼び出す
        let tmpFileDataObj = regstFunction(JSON.parse(readFile(filePath)), body);

        //データを登録
        let errMessage = overWriteData(filePath, JSON.stringify(tmpFileDataObj, null, '\t'));

        //登録更新削除に失敗
        if (errMessage) {
            return res
                .status(400)
                .json({ errMessage });
        }

        //正常終了
        return res
            .status(200)
            .json({ errMessage: `${updMessage}が完了しました。` });

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
