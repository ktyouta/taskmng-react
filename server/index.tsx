import express from 'express';
import ENV from '../src/env.json';
import { checkFile, overWriteData, readFile } from './FileFunction';
import { bodyObj, generalDetailType, taskListType, userInfoType } from './Type/type';
import { authenticate } from './AuthFunction';
import { config } from './ApiConfig';
import { checkUpdAuth, createAddMasterData, createDelMasterData, createUpdMasterData, runRegister } from './MasterDataFunction';
import { GENERALDETAILFILEPATH, GENERALFILEPATH, JSONEXTENSION, MASTERFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from './Constant';
import { runAddMaster } from './AddMasterDataFunction';
import { getGeneralDetailData } from './GeneralFunction';
import { getTask, runAddTask, runDeleteTask, runUpdTask } from './TaskFunction';

const app: express.Express = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');



//crosの設定
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

//postでデータを受け取る際に必要
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

//ポートENV.PORT番で待ち受け
app.listen(ENV.PORT, function () {
    console.log(`Express listening on port ${ENV.PORT}!`);
});


/**
 * GET
 */
/**
 * masterにアクセスした際の動作
 */
app.get(ENV.MASTER, function (req, res) {
    if (!req.query.filename) {
        return;
    }
    let fileData = readFile(`${MASTERFILEPATH}${req.query.filename}${JSONEXTENSION}`);
    res.status(200).json(JSON.parse(fileData));
});

/**
 * データ取得用apiを動的に生成
 */
config.get.forEach((element) => {
    app.get(element.callUrl, function (req, res) {
        let fileData = readFile(element.fileUrl);
        //デコードしてクライアントに返却
        res.status(200).json(JSON.parse(fileData));
    });
});

/**
 * generaldetailにアクセスした際の動作
 */
app.get(`${ENV.GENERALDETAIL}`, function (req, res) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }
    let generalDetailList = getGeneralDetailData();
    res.status(200).json(generalDetailList);
});


/**
 * generaldetailにアクセスした際の動作(パスパラメータあり)
 */
app.get(`${ENV.GENERALDETAIL}/:param`, function (req, res) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }
    let generalDetailList = getGeneralDetailData(req.params.param);
    res.status(200).json(generalDetailList);
});


/**
 * taskにアクセスした際の動作
 */
app.get(ENV.TASK, function (req, res) {
    getTask(res, req);
});

/**
 * task/idにアクセスした際の動作
 */
app.get(`${ENV.TASK}/:param`, function (req, res) {
    getTask(res, req, req.params.param);
});




/**
 * POST
 */
/**
 * masterの登録
 */
app.post(ENV.MASTER, function (req, res) {
    runRegister(res, req, createAddMasterData);
});

/**
 * 新規マスタ追加
 */
app.post(ENV.MASTERTABLE, function (req, res) {
    runAddMaster(res, req);
});

/**
 * タスクの登録
 */
app.post(ENV.TASK, function (req, res) {
    runAddTask(res, req);
});



/**
 * 認証+Tokenの発行
 */
app.post(ENV.LOGIN, function (req, res) {
    //ID,PW取得
    var userId = req.body.userId;
    var password = req.body.password;

    //認証
    let fileData = readFile(`${SETTINGFILEPATH}userinfo${JSONEXTENSION}`);
    //ファイルの読み込みに失敗
    if (!fileData) {
        return res
            .status(500)
            .json({ errMessage: '予期しないエラーが発生しました。' });
    }

    //ユーザー情報の配列
    let userJson: userInfoType[] = JSON.parse(fileData).user;
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
    const token = jwt.sign({ ID: jwtStr }, config.jwt.secret, { expiresIn: '1h' });
    res.status(200).json({ errMessage: '', token: token, userInfo: { userId: userId } });
});


/**
 * 認証チェック処理
 */
app.post(ENV.AUTH, function (req, res) {
    let authResult = authenticate(req.cookies.cookie);
    res.status(authResult.status).json({ errMessage: authResult.errMessage, userInfo: authResult.userInfo });
});


/**
 * PUT
 */
/**
 * masterの更新
 */
app.put(ENV.MASTER, function (req, res) {
    runRegister(res, req, createUpdMasterData, "PUT");
});

/**
 * taskの更新
 */
app.put(`${ENV.TASK}/:param`, function (req, res) {
    runUpdTask(res, req, req.params.param);
});



/**
 * DELETE
 */
app.delete(`${ENV.MASTER}/:param`, function (req, res) {
    runRegister(res, req, createDelMasterData, "DELETE", req.params.param);
});

/**
 * taskの削除
 */
app.delete(`${ENV.TASK}/:param`, function (req, res) {
    runDeleteTask(res, req, req.params.param);
});
