import express from 'express';
import { readFile } from './FileFunction';
import { authInfoType, userInfoType } from './Type/type';
import {config} from './Config';

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app: express.Express = express();

app.use(cookieParser());

export function authenticate(cookie:string): authInfoType {
    let tmpAuthInfo: authInfoType = { status: 200, errMessage: "", userInfo: { userId: "", userName: "", auth: "" } };
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
        let fileData = readFile(`./public/json/setting/userinfo.json`);
        //ファイルの読み込みに失敗
        if (!fileData) {
            tmpAuthInfo.status = 500;
            tmpAuthInfo.errMessage = '予期しないエラーが発生しました。';
            return tmpAuthInfo;
        }

        //ユーザー情報の配列
        let userJson: userInfoType[] = JSON.parse(fileData).user;
        let isExist: boolean = false;
        for (let i = 0; i < userJson.length; i++) {
            if (isExist = (userId === userJson[i].userId && password === userJson[i].password)) {
                tmpAuthInfo.userInfo = userJson[i];
                break;
            }
        }

        //ユーザー情報が存在しない
        if (!isExist) {
            tmpAuthInfo.status = 400;
            tmpAuthInfo.errMessage = 'ユーザーIDまたはパスワードが違います。';
            return tmpAuthInfo;
        }

    } catch (err) {
        tmpAuthInfo.status = 500;
        tmpAuthInfo.errMessage = '予期しないエラーが発生しました。';
    }
    return tmpAuthInfo;
}