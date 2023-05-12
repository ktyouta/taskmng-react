import { authenticate } from "./AuthFunction";
import { JSONEXTENSION, TASKFILENM, TRANSACTION } from "./Constant";
import { overWriteData, readFile } from "./FileFunction";
import { getGeneralDetailData } from "./GeneralFunction";
import { checkUpdAuth } from "./MasterDataFunction";
import { taskListType } from "./Type/type";

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
    let fileData = readFile(`${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`);
    let decodeFileData: taskListType[] = JSON.parse(fileData);
    
    //内容でフィルター
    if (req.query.content) {
        let content = req.query.content as string;
        decodeFileData = decodeFileData.filter((element) => {
            return element.content.includes(content);
        });
    }

    //優先度およびステータスの紐づけを行う
    let joinTaskData: taskListType[] = joinTask(decodeFileData);

    //パスパラメータの指定あり
    if (id) {
        let singleTaskData = joinTaskData.find((element) => { return element.id === id });
        if (!singleTaskData) {
            return res.status(400).json({ errMessage: `該当データがありません。` });
        }
        return res.status(200).json(singleTaskData);
    }

    return res.status(200).json(joinTaskData);
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
    //タスクファイルパス
    let filePath = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;
    //タスクファイルの読み込み
    let fileData = readFile(`${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`);
    let decodeFileData: taskListType[] = JSON.parse(fileData);

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: taskListType = {
        id: "",
        registerTime: "",
        content: "",
        updTime: "",
        limiTtime: "",
        userId: "",
        priority: "",
        status: ""
    };
    body = req.body;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    //未対応
    body.status = "1";

    //登録用データの作成
    let registData = createAddTaskData(decodeFileData, body);

    //データを登録
    let errMessage = overWriteData(filePath, JSON.stringify(registData, null, '\t'));

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
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createAddTaskData(fileDataObj: taskListType[], registData: taskListType)
    : taskListType[] {
    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'];
    registData['id'] = `${parseInt(id) + 1}`;
    fileDataObj.push(registData);
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