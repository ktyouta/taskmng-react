import useGetViewName from '../../Common/Hook/useGetViewName';
import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGlobalAtom, useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useEffect, useState } from 'react';
import { editModeAtom, userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { editModeEnum } from '../../Setting/Const/SettingConst';
import { userInfoType } from '../../Common/Type/CommonType';
import { GET_WORKHISTORY_INTERVAL, LOGIN_PATH, NOWPATH_STRAGEKEY, REACTQUERY_GETWORKHISTORY_KEY, USER_PATH } from '../Const/HeaderConst';
import useSwitch from '../../Common/Hook/useSwitch';
import { USERID_STRAGEKEY } from '../../Common/Const/CommonConst';
import { clientMenuListAtom } from '../../Content/Atom/ContentAtom';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { taskHistoryType } from '../../Home/Type/HomeType';
import { workHistoryObjType } from '../Type/HeaderType';


//引数の型
type propsType = {
    userInfo?: userInfoType,
}

function useHeader(props: propsType) {

    //認証クッキー
    const [cookie, , removeCookie] = useCookies();
    //ルーティング用
    const navigate = useNavigate();
    //ナビゲーション表示フラグ
    const { flag, onFlag, offFlag } = useSwitch();
    //作業履歴保持用
    const [workHistoryObj, setWorkHistoryObj] = useState<workHistoryObjType>();
    //作業履歴モーダル表示フラグ
    const { flag: isOpenModal, onFlag: openModal, offFlag: closeModal } = useSwitch();

    //作業履歴リストを取得
    const {
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useQueryWrapper<taskHistoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}`,
            queryKey: [REACTQUERY_GETWORKHISTORY_KEY],
            afSuccessFn: (data: taskHistoryType[]) => {

                if (!workHistoryObj) {
                    setWorkHistoryObj({
                        workHistoryList: data,
                        historyListPreDiffLen: 0
                    });
                }

                let tmpWorkHistoryObj: workHistoryObjType = JSON.parse(JSON.stringify(workHistoryObj));
                let preDiffLen = 0;

                //前回取得分の作業リストとの差分を取得する
                preDiffLen = data.length - tmpWorkHistoryObj.workHistoryList.length;

                if (preDiffLen < 0) {
                    preDiffLen = 0;
                }

                setWorkHistoryObj({
                    workHistoryList: data,
                    historyListPreDiffLen: preDiffLen
                });
            }
        }
    );

    /**
     * ログアウト
     */
    const logout = () => {
        Object.keys(cookie).forEach((key) => {
            removeCookie(key, { path: '/' });
        });
        navigate(LOGIN_PATH);
    }

    /**
     * ユーザー情報のクリックイベント
     */
    const clickUserInfo = () => {
        if (!props.userInfo) {
            alert("ユーザー情報画面にアクセスできません。");
            return;
        }

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
        localStorage.setItem(USERID_STRAGEKEY, props.userInfo?.userId ?? "");
        offFlag();
        navigate(USER_PATH);
    };

    //定期的に作業履歴を取得
    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, GET_WORKHISTORY_INTERVAL);

        // コンポーネントのアンマウント時にIntervalをクリア
        return () => clearInterval(intervalId);
    }, []);

    return {
        logout,
        flag,
        clickUserInfo,
        onFlag,
        offFlag,
        workHistoryObj,
        isOpenModal,
        openModal,
        closeModal,
    };
}

export default useHeader;
