import express from 'express';
import ENV from '../src/env.json';
import { config } from './ApiConfig';
import { createAddMasterData, createDelMasterData, createUpdMasterData, runRegister } from './MasterData/MasterDataFunction';
import { runAddMaster } from './AddMasterData/AddMasterDataFunction';
import { getGeneralData, getGeneralDetailData } from './General/GeneralFunction';
import { getTaskDetail, getTaskList, runAddTask, runDeleteTask, runMultiDeleteTask, runUpdTask } from './Task/TaskFunction';
import {
    getCustomAttribute,
    getCustomAttributeDetail,
    getCustomAttributeInputSetting,
    runAddCustomAttribute,
    runDeleteCustomAttribute,
    runUpdCustomAttribute
} from './Setting/CustomAttribute/CustomAttributeFunction';
import { getTaskHistory } from './History/HistoryFunction';
import { getUserInfo, getUserInfoDetail, runAddUser, runDeleteUser, runUpdUser } from './Setting/User/UserFunction';
import { getCategory, getCategoryDetail, runAddCategory, runDeleteCategory, runUpdCategory, runUpdCategoryOrder } from './Setting/Category/CategoryFunction';
import { Response, Request, ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { getDefaultAttribute, getDefaultAttributeDetail, runUpdDefaultAttribute } from './Setting/DefaultAttribute/DefaultAttributeFunction';
import { authenticate, createToken } from './Auth/AuthFunction';
import { readFile } from './Common/FileFunction';
import { getSearchCondition, runUpdSearchConditionList } from './Setting/SearchCondition/SearchConditionFunction';
import { JSONEXTENSION, MASTERFILEPATH } from './Common/Const/CommonConst';
import { getMemoDetail, getMemoList, getMemoSearchConditionList, runAddMemo, runDelMemo, runUpdMemo } from './Memo/MemoFunction';
import { getTagList } from './Tag/TagFunction';
import { getImageList } from './Image/ImageFunction';



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
    getGeneralData(req, res);
});


/**
 * generaldetailにアクセスした際の動作(パスパラメータあり)
 */
app.get(`${ENV.GENERALDETAIL}/:param`, function (req, res) {
    getGeneralDetailData(req, res)
});


/**
 * taskにアクセスした際の動作
 */
app.get(ENV.TASK, function (req, res) {
    getTaskList(res, req);
});

/**
 * task/idにアクセスした際の動作
 */
app.get(`${ENV.TASK}/:param`, function (req, res) {
    getTaskDetail(res, req, req.params.param);
});

/**
 * customattributeにアクセスした際の動作
 */
app.get(ENV.CUSTOMATTRIBUTE, function (req, res) {
    getCustomAttribute(res, req);
});

/**
 * customattribute/idにアクセスした際の動作
 */
app.get(`${ENV.CUSTOMATTRIBUTE}/:param`, function (req, res) {
    getCustomAttributeDetail(res, req, req.params.param);
});

/**
 * customattributeinputsettingにアクセスした際の動作
 */
app.get(`${ENV.CUSTOMATTRIBUTEINPUTSETTING}`, function (req, res) {
    getCustomAttributeInputSetting(res, req);
});

/**
 * taskhistoryにアクセスした際の動作
 */
app.get(`${ENV.TASKHISTORY}`, function (req, res) {
    getTaskHistory(res, req);
});

/**
 * userにアクセスした際の動作
 */
app.get(`${ENV.SETTINGUSER}`, function (req, res) {
    getUserInfo(res, req);
});

/**
 * user/idにアクセスした際の動作
 */
app.get(`${ENV.SETTINGUSER}/:param`, function (req, res) {
    getUserInfoDetail(res, req, req.params.param);
});

/**
 * categoryにアクセスした際の動作
 */
app.get(`${ENV.CATEGORY}`, function (req, res) {
    getCategory(res, req);
});

/**
 * category/idにアクセスした際の動作
 */
app.get(`${ENV.CATEGORY}/:param`, function (req, res) {
    getCategoryDetail(res, req, req.params.param);
});

/**
 * taskinputsettingにアクセスした際の動作
 */
app.get(`${ENV.TASKINPUTSETTING}`, function (req, res) {
    getDefaultAttribute(res, req);
});

/**
 * taskinputsetting/idにアクセスした際の動作
 */
app.get(`${ENV.TASKINPUTSETTING}/:param`, function (req, res) {
    getDefaultAttributeDetail(res, req, req.params.param);
});

/**
 * searchconditionにアクセスした際の動作
 */
app.get(`${ENV.SEARCHCONDITION}`, function (req, res) {
    getSearchCondition(res, req);
});

/**
 * memoにアクセスした際の動作
 */
app.get(ENV.MEMO, function (req, res) {
    getMemoList(res, req);
});

/**
 * memo/idにアクセスした際の動作
 */
app.get(`${ENV.MEMO}/:param`, function (req, res) {
    getMemoDetail(res, req, req.params.param);
});


/**
 * memosearchconditionにアクセスした際の動作
 */
app.get(ENV.MEMOSEARCHCONDITION, function (req, res) {
    getMemoSearchConditionList(res, req);
});


/**
 * taglistにアクセスした際の動作
 */
app.get(ENV.TAGLIST, function (req, res) {
    getTagList(res, req);
});

/**
 * imagelistにアクセスした際の動作
 */
app.get(ENV.IMAGELIST, function (req, res) {
    getImageList(res, req);
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
 * カスタム属性の登録
 */
app.post(ENV.CUSTOMATTRIBUTE, function (req, res) {
    runAddCustomAttribute(res, req);
});

/**
 * ユーザーの登録
 */
app.post(ENV.SETTINGUSER, function (req, res) {
    runAddUser(res, req);
});

/**
 * カテゴリの登録
 */
app.post(ENV.CATEGORY, function (req, res) {
    runAddCategory(res, req);
});

/**
 * 認証+Tokenの発行
 */
app.post(ENV.LOGIN, function (req, res) {
    createToken(res, req);
});

/**
 * 認証チェック処理
 */
app.post(ENV.AUTH, function (req, res) {
    let authResult = authenticate(req.cookies.cookie);
    res.status(authResult.status).json({ errMessage: authResult.errMessage, userInfo: authResult.userInfo });
});

/**
 * メモの登録
 */
app.post(ENV.MEMO, function (req, res) {
    runAddMemo(res, req);
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
 * カスタム属性の更新
 */
app.put(`${ENV.CUSTOMATTRIBUTE}/:param`, function (req, res) {
    runUpdCustomAttribute(res, req, req.params.param);
});

/**
 * ユーザー情報の更新
 */
app.put(`${ENV.SETTINGUSER}/:param`, function (req, res) {
    runUpdUser(res, req, req.params.param);
});

/**
 * カテゴリの更新
 */
app.put(`${ENV.CATEGORY}/:param`, function (req, res) {
    runUpdCategory(res, req, req.params.param);
});

/**
 * カテゴリの表示順の更新
 */
app.put(`${ENV.CATEGORYORDER}`, function (req, res) {
    runUpdCategoryOrder(res, req);
});

/**
 * タスクのデフォルト属性の更新
 */
app.put(`${ENV.TASKINPUTSETTING}/:param`, function (req, res) {
    runUpdDefaultAttribute(res, req, req.params.param);
});

/**
 * 検索条件の更新
 */
app.put(`${ENV.SEARCHCONDITION}`, function (req, res) {
    runUpdSearchConditionList(res, req);
});

/**
 * memo/idにアクセスした際の動作
 */
app.put(`${ENV.MEMO}/:param`, function (req, res) {
    runUpdMemo(res, req, req.params.param);
});

/**
 * タスクの複数削除
 */
app.put(ENV.TASK, function (req, res) {
    runMultiDeleteTask(res, req);
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

/**
 * カスタム属性の削除
 */
app.delete(`${ENV.CUSTOMATTRIBUTE}/:param`, function (req, res) {
    runDeleteCustomAttribute(res, req, req.params.param);
});

/**
 * ユーザー情報の削除
 */
app.delete(`${ENV.SETTINGUSER}/:param`, function (req, res) {
    runDeleteUser(res, req, req.params.param);
});

/**
 * カテゴリの削除
 */
app.delete(`${ENV.CATEGORY}/:param`, function (req, res) {
    runDeleteCategory(res, req, req.params.param);
});

/**
 * memo/idにアクセスした際の動作
 */
app.delete(`${ENV.MEMO}/:param`, function (req, res) {
    runDelMemo(res, req, req.params.param);
});