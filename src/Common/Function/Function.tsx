import axios from 'axios';
import { apiResponseType, bodyObj, refInfoType } from '../Type/CommonType';

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