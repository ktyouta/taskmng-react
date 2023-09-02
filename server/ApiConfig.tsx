import ENV from '../src/env.json';

export const config = {
    //token設定
    jwt: {
        secret: 'my_secret',
        options: {
            algorithm: 'HS256',
            expiresIn: '30m'
        }
    },
    //GETメソッド用
    get:[
        {
            callUrl:ENV.MENU,
            fileUrl:"./public/json/setting/menu.json"
        },
        {
            callUrl:ENV.MASTERTABLE,
            fileUrl:"./public/json/master/samplemastertable.json"
        },
        {
            callUrl:ENV.INPUTSETTING,
            fileUrl:"./public/json/setting/inputsetting.json"
        },
        {
            callUrl:ENV.TABLECOLUMN,
            fileUrl:"./public/json/setting/tablecolumn.json"
        },
        {
            callUrl:ENV.WORKHISTORY,
            fileUrl:"./public/json/transaction/workhistory.json"
        },
        {
            callUrl:ENV.SEARCHCONDITION,
            fileUrl:"./public/json/setting/searchcondition.json"
        },
        {
            callUrl:ENV.TASKCONTENTSETTING,
            fileUrl:"./public/json/setting/taskcontentsetting.json"
        },
        {
            callUrl:ENV.SETTINGMENU,
            fileUrl:"./public/json/setting/settingmenu.json"
        }
    ]
};