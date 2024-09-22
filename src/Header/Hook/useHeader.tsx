import useGetViewName from '../../Common/Hook/useGetViewName';
import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGlobalAtom, useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useEffect, useMemo, useState } from 'react';
import { editModeAtom, userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { editModeEnum } from '../../Setting/Const/SettingConst';
import { userInfoType } from '../../Common/Type/CommonType';
import { GET_WORKHISTORY_INTERVAL, LOGIN_PATH, NOWPATH_STRAGEKEY, REACTQUERY_GETWORKHISTORY_KEY, UNREAD_NUM_CONNECT, UNREAD_NUM_KEY, USER_PATH } from '../Const/HeaderConst';
import useSwitch from '../../Common/Hook/useSwitch';
import { USERID_STRAGEKEY } from '../../Common/Const/CommonConst';
import { clientMenuListAtom } from '../../Content/Atom/ContentAtom';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { taskHistoryType } from '../../Home/Type/HomeType';
import { workHistoryObjType } from '../Type/HeaderType';
import { objectDeepCopy } from '../../Common/Function/Function';
import { createNewUnReadInfo, getUnReadNumInfo, setUnreadCount } from '../Function/HeaderFunction';


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

                //ローカルストレージから未読件数情報をリスト取得する
                let nowDiffInfoArr = getUnReadNumInfo();

                //新たに保存する未読件数情報を作成する
                let latestUnReadInfo = createNewUnReadInfo(nowDiffInfoArr, data);

                //未読件数情報をローカルストレージに保存する
                setUnreadCount(latestUnReadInfo.unReadInfo);

                //差分なし
                if (latestUnReadInfo.preDiff <= 0 && workHistoryObj) {
                    return;
                }

                setWorkHistoryObj({
                    workHistoryList: data,
                    historyListPreDiffLen: latestUnReadInfo.diff
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

    /**
     * 通知モーダルのオープン
     */
    const openNoticeModal = () => {

        if (!workHistoryObj) {
            return;
        }

        const unReadNum = 0;

        //未読件数を0件でローカルストレージに保存する
        setUnreadCount(`${unReadNum}-${workHistoryObj.workHistoryList.length}`);

        setWorkHistoryObj({
            workHistoryList: workHistoryObj.workHistoryList,
            historyListPreDiffLen: unReadNum
        });

        openModal();
    };

    /**
     * 通知モーダルのクローズ
     */
    const closeNoticeModal = () => {

        if (!workHistoryObj) {
            closeModal();
            return;
        }

        const unReadNum = 0;

        //未読件数を0件でローカルストレージに保存する
        setUnreadCount(`${unReadNum}-${workHistoryObj?.workHistoryList.length}`);

        closeModal();
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
        openNoticeModal,
        closeNoticeModal,
    };
}

export default useHeader;
