import express from 'express';
import { config } from '../ApiConfig';
import { resUserInfoType, userInfoType } from '../Setting/User/Type/UserType';
import { authInfoType, authType } from './Type/AuthType';
import { USERINFO_FILEPATH } from '../Setting/User/Const/UserConst';
import { readFile } from '../Common/FileFunction';
import { USER_AUTH } from './Const/AuthConst';
import { getAuthObjList, getUserAuthList } from './AuthSelectFunction';
import { checkAuthAction } from '../Common/Function';


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
        errMessage: ""
    };
    try {
        //クッキーが存在しない
        if (!cookie) {
            tmpAuthInfo.status = 400;
            tmpAuthInfo.errMessage = '認証に失敗しました。';
            return tmpAuthInfo;
        }

        //トークンの作成に使用したキーを取得
        const decoded = jwt.verify(cookie, config.jwt.secret);
        const id = decoded.ID;

        let userArray = id.split(',');
        let userId = userArray[0];
        let password = userArray[1];

        //認証
        let fileData = readFile(USERINFO_FILEPATH);
        //ファイルの読み込みに失敗
        if (!fileData) {
            tmpAuthInfo.status = 500;
            tmpAuthInfo.errMessage = 'ユーザー情報設定ファイルが存在しません。';
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

        //権限情報を取得する
        let authList = getAuthObjList();

        //ユーザーの権限情報を取得する
        let userAuthList = getUserAuthList(authList, userData.userId);

        //権限情報が存在しない
        if (!userAuthList || userAuthList.length === 0) {
            tmpAuthInfo.status = 400;
            tmpAuthInfo.errMessage = '権限情報が存在しません。';
            return tmpAuthInfo;
        }

        let resuserInfo: resUserInfoType = { ...userData, authList: userAuthList };
        tmpAuthInfo.userInfo = resuserInfo;

    } catch (err) {

        console.log("err:", err);

        if (err instanceof Error) {

            switch (err.name) {
                //トークンの期限切れ
                case 'TokenExpiredError':
                    tmpAuthInfo.status = 401;
                    tmpAuthInfo.errMessage = 'トークンの期限が切れました。\r\n再度ログインしてください。';
                    break;
                default:
                    tmpAuthInfo.status = 500;
                    tmpAuthInfo.errMessage = '予期しないエラーが発生しました。';
                    break;
            }
        }
        else {
            tmpAuthInfo.status = 500;
            tmpAuthInfo.errMessage = '予期しないエラーが発生しました。';
        }
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
 * 対象メニューに対するユーザーの権限を取得する
 */
export function getMenuAuth(userInfo: resUserInfoType, menuId: string,) {

    //ユーザーの権限リストからメニューの権限を取得する
    return userInfo.authList.find((element: authType) => {

        return element.menuId === menuId && checkAuthAction(element.auth, USER_AUTH.PUBLIC);
    });
}