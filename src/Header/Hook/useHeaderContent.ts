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
import { DELETE_ON, GET_WORKHISTORY_INTERVAL, LOGIN_PATH, NOWPATH_STRAGEKEY, REACTQUERY_GETWORKHISTORY_KEY, UNREAD_NUM_CONNECT, UNREAD_NUM_KEY, USER_PATH } from '../Const/HeaderConst';
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
    workHistory: taskHistoryType,
    closeModal: () => void,
}

function useHeaderContent(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();
    //ホバーしているID
    const [hoverId, setHoverId] = useState("");

    /**
     * IDのクリックイベント
     */
    const clickId = () => {

        //削除済みの場合は画面遷移させない
        if (props.workHistory.taskDelFlg === DELETE_ON) {
            alert("選択したデータは削除されているため閲覧できません。");
            return;
        }

        navigate(`${props.workHistory.url}`.replace(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.LOCALPORT}/`, ""));
        props.closeModal();
    };

    /**
     * IDのホバーイベント
     */
    const onId = () => {
        setHoverId(props.workHistory.taskId);
    }

    /**
     * IDからカーソルを外した際の処理
     */
    const leaveId = () => {
        setHoverId("");
    };

    return {
        hoverId,
        clickId,
        onId,
        leaveId,
    };
}

export default useHeaderContent;
