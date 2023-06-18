import { authenticate } from "./AuthFunction";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "./Constant";
import { overWriteData, readFile } from "./FileFunction";
import { getGeneralDetailData } from "./GeneralFunction";
import { checkUpdAuth } from "./MasterDataFunction";
import { authInfoType, searchConditionType, taskListType } from "./Type/type";

//タスクファイルのパス
const TASK_FILEPATH = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;
//タスクIDの接頭辞
const PRE_TASK_ID = `TASKID-`;

/**
 * タスクの取得
 */
export function getTask(res: any, req: any, id?: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    //クエリストリングでフィルター
    decodeFileData = filterTask(decodeFileData, req.query);

    //優先度およびステータスの紐づけを行う
    //let joinTaskData: taskListType[] = joinTask(decodeFileData);

    //パスパラメータの指定あり
    if (id) {
        let singleTaskData = decodeFileData.find((element) => { return element.id === id });
        if (!singleTaskData) {
            return res.status(400).json({ errMessage: `該当データがありません。` });
        }
        return res.status(200).json(singleTaskData);
    }

    return res.status(200).json(decodeFileData);
}

/**
 * タスクの追加
 */
export function runAddTask(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //登録用データの作成
    let registData = createAddTaskData(decodeFileData, req, authResult);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}

/**
 * タスクの更新
 */
export function runUpdTask(res: any, req: any, pathPrm: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!pathPrm) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //更新用データの作成
    let registData = createUpdTaskData(decodeFileData, req.body, pathPrm);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}

/**
 * タスクの削除
 */
export function runDeleteTask(res: any, req: any, pathPrm: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!pathPrm) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //削除用データの作成
    let registData = createDeleteTaskData(decodeFileData, req.body, pathPrm);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `削除が完了しました。` });
}


/**
 * タスクファイルからオブジェクトを取得
 */
function getTaskObj(): taskListType[] {
    //タスクファイルの読み込み
    let fileData = readFile(TASK_FILEPATH);
    return JSON.parse(fileData);
}

/**
 * タスク用の検索条件を取得
 */
function getTaskSearchConditionList() {
    //タスクファイルの読み込み
    let fileData = readFile(`${SETTINGFILEPATH}${SEARCHCONDITIONFILEPATH}${JSONEXTENSION}`);
    return JSON.parse(fileData).task;
}

/**
 * タスクリストをクエリストリングで絞り込む
 */
function filterTask(decodeFileData: taskListType[], query: any) {
    //タスク用の検索条件設定リストを取得
    let taskConditionList: searchConditionType[] = getTaskSearchConditionList();
    //検索条件で絞り込み
    taskConditionList.forEach((element) => {
        let value = query[element.id] as string;
        if (!value) {
            return;
        }
        decodeFileData = decodeFileData.filter((item) => {
            if (!(element.id in item)) {
                return true;
            }
            //複数選択項目の場合
            if (element.type === "checkbox") {
                return value.split(",").includes(item[element.id]);
            }
            return item[element.id].includes(value);
        });
    });

    //キーワードで絞り込み
    let keyword = query.keyword as string;
    if (keyword) {
        decodeFileData = decodeFileData.filter((element) => {
            return element.title.includes(keyword) || element.content.includes(keyword);
        });
    }

    //取得件数で絞り込み
    let getNum = query.num as number;
    if (getNum && !isNaN(Number(getNum))) {
        decodeFileData = decodeFileData.slice(0, getNum);
    }
    return decodeFileData;
}


/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createAddTaskData(fileDataObj: taskListType[], req: any, authResult: authInfoType)
    : taskListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: taskListType = {
        id: "",
        content: "",
        registerTime: "",
        updTime: "",
        limitTime: "",
        userId: "",
        priority: "",
        status: "",
        deleteFlg: "",
        title: ""
    };
    body = req.body;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    //未対応
    //body.status = "1";
    body.deleteFlg = "0";

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_TASK_ID}`, "");
    //新しいIDを割り当てる
    body['id'] = `${PRE_TASK_ID}${parseInt(id) + 1}`;
    fileDataObj.push(body);
    return fileDataObj;
}

/**
 * 更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createUpdTaskData(fileDataObj: taskListType[], body: taskListType, updTaskId: string)
    : taskListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.id === updTaskId) {
            Object.keys(element).forEach((item) => {
                if (item === `id` || item === `deleteFlg`) return true;
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                element[item] = body[item];
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
function createDeleteTaskData(fileDataObj: taskListType[], body: taskListType, delTaskId: string)
    : taskListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを削除
        if (element.id === delTaskId) {
            Object.keys(element).forEach((item) => {
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                //削除フラグを立てる
                if (item === `deleteFlg`) {
                    element[item] = "1";
                    return true;
                }
            });
            return true;
        }
    });
    return fileDataObj;
}


/**
 * タスクのjoinを行う
 */
function joinTask(decodeFileData: taskListType[]) {
    //汎用詳細データを取得
    //タスク優先度リスト
    let taskPriorityList = getGeneralDetailData("2");

    //タスクステータスリスト
    let taskStatusList = getGeneralDetailData("3");

    //優先度およびステータスの紐づけを行う
    let joinTaskData: taskListType[] = [];
    decodeFileData.forEach((element) => {
        let isMatchPriority = false;
        let isMatchStatus = false;
        taskPriorityList.some((item) => {
            //優先度が一致
            if (element.priority === item.value) {
                element.priority = item.label;
                return isMatchPriority = true;
            }
        });
        taskStatusList.some((item) => {
            //ステータスが一致
            if (element.status === item.value) {
                element.status = item.label;
                return isMatchStatus = true;
            }
        });
        //優先度とステータスの結合に成功したデータのみクライアントに返却する
        if (isMatchPriority && isMatchStatus) {
            joinTaskData.push(element);
        }
    });
    return joinTaskData;
}

/**
 * 現在日時を取得
 */
function getNowDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    return `${year}${month}${date}`;
}