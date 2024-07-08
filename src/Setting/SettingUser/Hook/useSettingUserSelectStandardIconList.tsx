import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { editModeAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";
import useSwitch from "../../../Common/Hook/useSwitch";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { useState } from "react";
import { imageListResType } from "../Type/SettingUserType";
import { ICON_LIST_URL } from "../Const/SettingUserConst";


//引数の型
type prospType = {
    iconUrl: string | undefined,
    setIconUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
    closeModal: () => void,
}

function useSettingUserSelectStandardIconList(props: prospType) {

    //アイコンリスト
    const [iconList, setIconList] = useState<imageListResType[]>();

    //タスクリストを取得
    const { isLoading } = useQueryWrapper<imageListResType[]>(
        {
            url: ICON_LIST_URL,
            afSuccessFn: (data: imageListResType[]) => {
                setIconList(data);
            }
        }
    );

    //アイコンのクリックイベント
    function clickIcon(url: string,) {
        props.setIconUrl(url);
        props.closeModal();
    }

    return {
        iconList,
        clickIcon
    }
}

export default useSettingUserSelectStandardIconList;