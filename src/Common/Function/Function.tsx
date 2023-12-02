import axios from 'axios';
import { apiResponseType, bodyObj, refInfoType, refInputCheckType } from '../Type/CommonType';

//jsonファイルにデータを登録する
export const createJsonData = (url: string, name: bodyObj) => {
    axios.post(url, { name }).then(response => {
        console.log(response)
    })
}

//post通信を行う
export const postJsonData = (url: string, cookie: string, body: bodyObj, callback?: (data: any) => void) => {
    let apiResponse: apiResponseType = {};
    // POST送信
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie,
        },
        body: JSON.stringify(body),
        mode: 'cors',
        credentials: 'include'
    }).then((res) => {
        apiResponse.status = res.status;
        return res.json()
    }).then((data: any) => {
        if (callback) {
            apiResponse.json = data;
            callback(apiResponse);
        }
    })
}

//パスパラメータの作成
export function createPathPrm() {

}

//リクエストボディの作成
export function createRequestBody(refInputArray: refInfoType[]) {
    let tmpBody: bodyObj = {};
    //bodyの作成
    refInputArray.forEach((element) => {
        let postValue: string | undefined = element.value;
        if (element.ref && element.ref.current) {
            postValue = element.ref?.current?.refValue;
        }
        tmpBody[element.id] = postValue;
    });
    return tmpBody;
}

//リクエストボディの入力チェック
export function requestBodyInputCheck(refInputArray: refInfoType[]) {
    let checkObj: refInputCheckType = {
        refInfoArray: [],
        errFlg: false
    };
    let tmpRefInputArray: refInfoType[] = JSON.parse(JSON.stringify(refInputArray));
    //bodyの作成
    tmpRefInputArray.forEach((element) => {
        //必須チェック
        if (element.isRequired && !element.ref.current?.refValue) {
            element.errMessage = `${element.name}は必須項目です。`;
            checkObj.errFlg = true;
        }
    });
    checkObj.refInfoArray = tmpRefInputArray;
    return checkObj;
}

/**
 * 文字列を日付に変換
 */
export const parseStrDate = (strDate: string) => {
    const year = strDate.substring(0, 4);
    const month = strDate.substring(4, 6);
    const day = strDate.substring(6, 8);
    if (isNaN(Date.parse(`${year}/${month}/${day}`))) {
        return "";
    }
    return `${year}/${month}/${day}`;
};

/**
 * 日付の文字列変換
 */
export const getNowDate = (now: Date) => {
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    return `${year}${month}${date}`;
};