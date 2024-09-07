// 権限チェックAPIのテストレスポンス
export const authInfo = {
    errMessage: "",
    userInfo: {
        userId: "f",
        userName: "テスト管理者",
        password: "f",
        auth: "3",
        registerTime: "2024/01/01",
        updTime: "2024/08/10",
        deleteFlg: "0",
        iconType: "2",
        iconUrl: "http://localhost:3000/img/standard/testimg1.png"
    }
};

//テスト用カテゴリ
export const categoryInfo = [
    {
        id: "CATEGORY-1",
        name: "ホーム",
        path: "/",
        componentName: "Home",
        auth: "1",
        isHidden: "0",
        deleteFlg: "0",
        order: "1",
        "registerTime": "",
        updTime: "2024/06/28",
        userId: "f"
    },
    {
        id: "CATEGORY-3",
        name: "マスタ編集",
        path: "/master",
        componentName: "Master",
        auth: "2",
        isHidden: "0",
        deleteFlg: "0",
        order: "2",
        "registerTime": "",
        updTime: "2024/06/28",
        userId: "f"
    },
    {
        id: "CATEGORY-4",
        name: "新規マスタ追加",
        path: "/addmaster",
        componentName: "AddMaster",
        auth: "2",
        isHidden: "0",
        deleteFlg: "0",
        order: "3",
        "registerTime": "",
        updTime: "2024/06/28",
        userId: "f"
    },
    {
        id: "CATEGORY-5",
        name: "タスク管理",
        path: "/task",
        componentName: "Task",
        auth: "1",
        isHidden: "0",
        deleteFlg: "0",
        order: "4",
        "registerTime": "",
        updTime: "2024/06/28",
        userId: "f"
    },
    {
        id: "CATEGORY-6",
        name: "メモ管理",
        path: "/memo",
        componentName: "Memo",
        auth: "1",
        isHidden: "0",
        deleteFlg: "0",
        order: "5",
        "registerTime": "2024/03/20",
        updTime: "2024/06/28",
        userId: "f"
    },
    {
        name: "作業履歴",
        path: "/history",
        componentName: "History",
        auth: "3",
        isHidden: "0",
        userId: "f",
        "registerTime": "2023/12/30",
        updTime: "2024/06/28",
        deleteFlg: "0",
        id: "CATEGORY-9",
        order: "6"
    },
    {
        id: "CATEGORY-7",
        name: "設定",
        path: "/setting",
        componentName: "Setting",
        auth: "3",
        isHidden: "0",
        deleteFlg: "0",
        order: "7",
        "registerTime": "",
        updTime: "2024/06/28",
        userId: "f"
    },
    {
        name: "ユーザー情報",
        path: "/user",
        componentName: "User",
        auth: "1",
        isHidden: "1",
        userId: "f",
        "registerTime": "2023/12/30",
        updTime: "2024/06/28",
        deleteFlg: "0",
        id: "CATEGORY-8",
        order: "8"
    }
];

//テスト用汎用詳細
export const generalInfo = [
    {
        id: "1",
        value: "1",
        label: "一般"
    },
    {
        id: "1",
        value: "2",
        label: "専用ユーザー"
    },
    {
        id: "1",
        value: "3",
        label: "管理者"
    },
    {
        id: "2",
        value: "1",
        label: "高"
    },
    {
        id: "2",
        value: "2",
        label: "中"
    },
    {
        id: "2",
        value: "3",
        label: "低"
    },
    {
        id: "3",
        value: "1",
        label: "未対応"
    },
    {
        id: "3",
        value: "2",
        label: "完了"
    },
    {
        id: "3",
        value: "3",
        label: "保留"
    },
    {
        id: "3",
        value: "4",
        label: "対応中"
    },
    {
        id: "4",
        value: "input",
        label: "テキストボックス"
    },
    {
        id: "4",
        value: "textarea",
        label: "テキストエリア"
    },
    {
        id: "4",
        value: "number",
        label: "数値"
    },
    {
        id: "4",
        value: "select",
        label: "選択リスト(コンボボックス)"
    },
    {
        id: "4",
        value: "radio",
        label: "選択リスト(ラジオボタン)"
    },
    {
        id: "4",
        value: "checkbox",
        label: "選択リスト(チェックボックス)"
    },
    {
        id: "4",
        value: "date",
        label: "日付"
    },
    {
        id: "5",
        value: "1",
        label: "登録"
    },
    {
        id: "5",
        value: "2",
        label: "更新"
    },
    {
        id: "5",
        value: "3",
        label: "削除"
    },
    {
        id: "6",
        value: "1990",
        label: "1990"
    },
    {
        id: "6",
        value: "1991",
        label: "1991"
    },
    {
        id: "6",
        value: "1992",
        label: "1992"
    },
    {
        id: "6",
        value: "1993",
        label: "1993"
    },
    {
        id: "6",
        value: "1994",
        label: "1994"
    },
    {
        id: "6",
        value: "1995",
        label: "1995"
    },
    {
        id: "6",
        value: "1996",
        label: "1996"
    },
    {
        id: "6",
        value: "1997",
        label: "1997"
    },
    {
        id: "6",
        value: "1998",
        label: "1998"
    },
    {
        id: "6",
        value: "1999",
        label: "1999"
    },
    {
        id: "6",
        value: "2000",
        label: "2000"
    },
    {
        id: "6",
        value: "2001",
        label: "2001"
    },
    {
        id: "6",
        value: "2002",
        label: "2002"
    },
    {
        id: "6",
        value: "2003",
        label: "2003"
    },
    {
        id: "6",
        value: "2004",
        label: "2004"
    },
    {
        id: "6",
        value: "2005",
        label: "2005"
    },
    {
        id: "6",
        value: "2006",
        label: "2006"
    },
    {
        id: "6",
        value: "2007",
        label: "2007"
    },
    {
        id: "6",
        value: "2008",
        label: "2008"
    },
    {
        id: "6",
        value: "2009",
        label: "2009"
    },
    {
        id: "6",
        value: "2010",
        label: "2010"
    },
    {
        id: "6",
        value: "2011",
        label: "2011"
    },
    {
        id: "6",
        value: "2012",
        label: "2012"
    },
    {
        id: "6",
        value: "2013",
        label: "2013"
    },
    {
        id: "6",
        value: "2014",
        label: "2014"
    },
    {
        id: "6",
        value: "2015",
        label: "2015"
    },
    {
        id: "6",
        value: "2016",
        label: "2016"
    },
    {
        id: "6",
        value: "2017",
        label: "2017"
    },
    {
        id: "6",
        value: "2018",
        label: "2018"
    },
    {
        id: "6",
        value: "2019",
        label: "2019"
    },
    {
        id: "6",
        value: "2020",
        label: "2020"
    },
    {
        id: "6",
        value: "2021",
        label: "2021"
    },
    {
        id: "6",
        value: "2022",
        label: "2022"
    },
    {
        id: "6",
        value: "2023",
        label: "2023"
    },
    {
        id: "6",
        value: "2024",
        label: "2024"
    },
    {
        id: "6",
        value: "2025",
        label: "2025"
    },
    {
        id: "6",
        value: "2026",
        label: "2026"
    },
    {
        id: "6",
        value: "2027",
        label: "2027"
    },
    {
        id: "6",
        value: "2028",
        label: "2028"
    },
    {
        id: "6",
        value: "2029",
        label: "2029"
    },
    {
        id: "6",
        value: "2030",
        label: "2030"
    },
    {
        id: "7",
        value: "1",
        label: "状態"
    }, {
        id: "7",
        value: "2",
        label: "優先度"
    }
];

//テストマスタテーブル
export const masterTable = {
    mastertable: [
        {
            value: "sample",
            label: "サンプルマスタ",
            remarks: "備考"
        },
        {
            value: "sample2",
            label: "サンプルマスタ2",
            remarks: "備考2"
        },
        {
            value: "sample3",
            label: "サンプルマスタ3",
            remarks: "備考3"
        },
        {
            value: "test",
            label: "登録テスト用",
            remarks: "登録テスト用ファイル"
        },
        {
            value: "test1",
            label: "新規追加テストファイル",
            remarks: "テストファイル"
        },
        {
            value: "test2",
            label: "新規追加テストファイル2",
            remarks: "test2"
        }
    ]
};

// テスト用作業履歴
export const taskHistory = [
    {
        time: "2023/08/04",
        userId: "f",
        taskId: "TASKID-137",
        editValue: "2",
        deleteFlg: "0",
        id: "152",
        editType: "更新",
        userName: "テスト管理者",
        iconUrl: "http://localhost:3000/img/standard/testimg1.png",
        taskTitle: "他ユーザー更新テスト2",
        priority: "1",
        status: "1",
        url: "http://localhost:3000/task/TASKID-137"
    },
    {
        time: "2024/08/04",
        userId: "f",
        taskId: "TASKID-137",
        editValue: "2",
        deleteFlg: "0",
        id: "152",
        editType: "更新",
        userName: "テスト管理者",
        iconUrl: "http://localhost:3000/img/standard/testimg1.png",
        taskTitle: "他ユーザー更新テスト2",
        priority: "1",
        status: "1",
        url: "http://localhost:3000/task/TASKID-137"
    },
];

//テスト用ログインレスポンス
export const loginInfoResponse = {
    errMessage: "",
    token: "token",
    userInfo: {
        userId: "f"
    }
};

//テストログインユーザー情報
export const userInfo = {
    userId: "f",
    userName: "テスト管理者",
    auth: "3",
    iconUrl: "http://localhost:3000/img/standard/testimg1.png",
};

//テストログインユーザー情報(アイコン未設定)
export const noIconUserInfo = {
    userId: "f",
    userName: "テスト管理者",
    auth: "3",
    iconUrl: "",
};

//テスト用ログイン情報
export const loginInfo = {
    userId: "f",
    password: "f",
};

//テスト用ログイン情報(失敗)
export const loginFailInfo = {
    userId: "testfail",
    password: "testfail",
};