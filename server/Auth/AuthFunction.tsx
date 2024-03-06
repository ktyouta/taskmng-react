import express from 'express';
import { readFile } from '../FileFunction';
import { config } from '../ApiConfig';
import { userInfoType } from '../SettingFunction/User/Type/UserType';
import { authInfoType } from './Type/AuthType';
import { USERINFO_FILEPATH } from '../SettingFunction/User/Const/UserConst';


const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app: express.Express = express();

app.use(cookieParser());


/**
 * 認証チェック
 * @param cookie 
 * @returns 
 */
export function authenticate(cookie: string): authInfoType {
    let tmpAuthInfo: authInfoType = {
        status: 200,
        errMessage: "",
        userInfo: {
            userId: "",
            userName: "",
            auth: "",
            registerTime: "",
            updTime: "",
        }
    };
    try {
        //クッキーが存在しない
        if (!cookie) {
            tmpAuthInfo.status = 400;
            tmpAuthInfo.errMessage = '認証に失敗しました。';
            return tmpAuthInfo;
        }

        //トークンの作成に使用したキーを取得
        const decoded = jwt.verify(cookie, config.jwt.secret).ID;

        let userArray = decoded.split(',');
        let userId = userArray[0];
        let password = userArray[1];

        //認証
        let fileData = readFile(USERINFO_FILEPATH);
        //ファイルの読み込みに失敗
        if (!fileData) {
            tmpAuthInfo.status = 500;
            tmpAuthInfo.errMessage = '予期しないエラーが発生しました。';
            return tmpAuthInfo;
        }

        //ユーザー情報リスト
        let userDatas: userInfoType[] = JSON.parse(fileData);
        let userData = userDatas.find((element) => {
            return userId === element.userId && password === element.password && element.deleteFlg !== "1";
        });

        //ユーザー情報が存在しない
        if (!userData) {
            tmpAuthInfo.status = 400;
            tmpAuthInfo.errMessage = 'ユーザーIDまたはパスワードが違います。';
            return tmpAuthInfo;
        }

        tmpAuthInfo.userInfo = userData;
    } catch (err) {
        console.log("err:", err);
        tmpAuthInfo.status = 500;
        tmpAuthInfo.errMessage = '予期しないエラーが発生しました。';
    }
    return tmpAuthInfo;
}

/**
 * 認証トークンの作成
 */
export function createToken(res: any, req: any) {
    //ID,PW取得
    var userId: string = req.body.userId;
    var password: string = req.body.password;

    //認証
    let fileData = readFile(USERINFO_FILEPATH);
    //ファイルの読み込みに失敗
    if (!fileData) {
        return res
            .status(500)
            .json({ errMessage: '予期しないエラーが発生しました。' });
    }

    //ユーザー情報の配列
    let userJson: userInfoType[] = JSON.parse(fileData);
    let isExist: boolean = false;
    for (let i = 0; i < userJson.length; i++) {
        if (isExist = (userId === userJson[i].userId && password === userJson[i].password)) {
            break;
        }
    }

    //ユーザー情報が存在しない
    if (!isExist) {
        return res
            .status(400)
            .json({ errMessage: 'ユーザーIDまたはパスワードが違います。' });
    }
    //token生成
    let jwtStr = `${userId},${password}`
    const token = jwt.sign({ ID: jwtStr }, config.jwt.secret, { expiresIn: config.jwt.options.expiresIn });
    res.status(200).json({ errMessage: '', token: token, userInfo: { userId: userId } });
}


/**
 * 登録更新削除前認証チェック
 */
export function checkUpdAuth(cookie: any): authInfoType {
    //認証チェック
    let authResult = authenticate(cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //ファイルの更新権限チェック
    if (!authResult || !authResult.userInfo || parseInt(authResult.userInfo.auth) < 2) {
        return { status: 400, errMessage: `権限がありません。` };
    }

    return authResult;
}