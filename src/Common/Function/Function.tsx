import axios from 'axios';
import { apiResponseType, bodyObj, refInfoType, refInputCheckType, userInfoType } from '../Type/CommonType';
import { NOWPATH_STRAGEKEY, USER_PATH } from '../../Header/Const/HeaderConst';
import { USERID_STRAGEKEY } from '../Const/CommonConst';
import { NavigateFunction } from 'react-router-dom';
import { authType } from '../Hook/useCheckAuth';

//jsonファイルにデータを登録する
export const createJsonData = (url: string, name: bodyObj) => {
    axios.post(url, { name }).then(response => {
        console.log(response)
    })
}

//post通信を行う
// export const postJsonData = (url: string, cookie: string, body: bodyObj, callback?: (data: any) => void) => {
//     let apiResponse: apiResponseType = {};
//     // POST送信
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': cookie,
//         },
//         body: JSON.stringify(body),
//         mode: 'cors',
//         credentials: 'include'
//     }).then((res) => {
//         apiResponse.status = res.status;
//         return res.json()
//     }).then((data: any) => {
//         if (callback) {
//             apiResponse.json = data;
//             callback(apiResponse);
//         }
//     })
// }


//リクエストボディの作成
export function createRequestBody(refInputArray: refInfoType[]) {
    let tmpBody: bodyObj = {};
    //bodyの作成
    refInputArray.forEach((element) => {
        let postValue: string | undefined = element.initValue;
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
    if (strDate.includes("/")) {
        strDate = strDate.replaceAll("/", "");
    }
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


/**
 * 検索オブジェクトからクエリストリングを作成
 * @returns 
 */
export function getUrlQuery(searchConditionObj: {
    [key: string]: string;
}) {
    let query = "";

    //モーダル内の検索条件を取得
    Object.keys(searchConditionObj).forEach((element) => {
        //値が存在するプロパティをクエリストリングに設定
        if (!searchConditionObj[element]) {
            return;
        }
        if (query !== "") {
            query += "&";
        }
        query += `${element}=${searchConditionObj[element]}`;
    });

    return query;
}


/**
 * クエリストリングを作成
 * @returns 
 */
export function createQuery(query: string) {

    return query.length > 0 ? `?${query}` : ``;
}

/**
 * オブジェクトのディープコピー
 * @param arg 
 * @returns 
 */
export function objectDeepCopy<T>(arg: T): T {
    return JSON.parse(JSON.stringify(arg));
}


/**
 * ユーザー情報画面に遷移する
 */
export function moveUserInfo(userId: string, navigate: NavigateFunction) {
    //現在のパスを保持する
    let pathArray = window.location.pathname.split("/");
    if (pathArray.length > 1) {
        pathArray.splice(0, 1);
        let mainPath = pathArray.join("/");

        if (mainPath !== USER_PATH.replace('/', "")) {
            //現在のパスをローカルストレージに保存する
            localStorage.setItem(NOWPATH_STRAGEKEY, `/${mainPath}`);
        }
    }

    //ユーザーIDをストレージに保持する
    localStorage.setItem(USERID_STRAGEKEY, userId);
    navigate(USER_PATH);
}

/**
 * 対象画面の権限を取得する
 */
export function getUserAuth(authList: authType[], menuId: string,) {

    return authList.find((element) => {
        return element.menuId === menuId;
    })?.auth;
}


/**
 * アクションに対する権限チェック
 * @param userAuth 
 * @param actionAuth 
 */
export function checkAuthAction(userAuth: string, actionAuth: string,) {

    return userAuth &&
        !Number.isNaN(userAuth) &&
        !Number.isNaN(actionAuth) &&
        parseInt(userAuth) >= parseInt(actionAuth);
}