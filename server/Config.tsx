import ENV from '../src/env.json';

export const config = {
    //token設定
    jwt: {
        secret: 'my_secret',
        options: {
            algorithm: 'HS256',
            expiresIn: '10m'
        }
    },
    //GETメソッド用
    get:[
        {
            callUrl:ENV.GETMENU,
            fileUrl:"./public/json/setting/menu.json"
        },
        {
            callUrl:ENV.GETMASTERTABLE,
            fileUrl:"./public/json/master/samplemastertable.json"
        },
        {
            callUrl:ENV.GETINPUTSETTING,
            fileUrl:"./public/json/setting/inputsetting.json"
        },
        {
            callUrl:ENV.GETTABLECOLUMN,
            fileUrl:"./public/json/setting/tablecolumn.json"
        },
        {
            callUrl:ENV.WORKHISTORY,
            fileUrl:"./public/json/transaction/workhistory.json"
        }
    ]
};