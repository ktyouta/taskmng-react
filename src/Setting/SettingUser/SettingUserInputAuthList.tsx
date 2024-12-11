import styled from 'styled-components';
import { RxCross1 } from 'react-icons/rx';
import { HeaderDiv, HeightDiv, VerticalFlowDiv } from '../../Common/StyledComponent/CommonStyledComponent';
import IconComponent from '../../Common/IconComponent';
import { authType } from '../../Common/Hook/useCheckAuth';
import useSettingUserInputAuthList from './Hook/useSettingUserInputAuthList';
import SettingUserInputAuthListForm from './SettingUserInputAuthListForm';
import SettingUserInputAuthListFooter from './SettingUserInputAuthListFooter';


//引数の型
type propsType = {
    closeFn?: () => void,
    inputUserAuthList: authType[],
    setInputUserAuthList: React.Dispatch<React.SetStateAction<authType[]>>,
    orgAuthList: authType[],
}

//ヘッダータイトルのスタイル
const HeaderTitleDiv = styled.div`
  width: 100%;
  height: 76%;
  background: linear-gradient(to right, #3f86ed, #4481eb, #04befe, #3f86ed);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  padding-left: 1%;
  border-radius: 9px;
  position:relative;
`;

//ヘッダー
const AuthHeaderDiv = styled(HeaderDiv) <{ height: string | undefined }>`
  padding-left:1%;
  height:${({ height }) => (height)};
  box-sizing:border-box;
  font-size:18px;
`;

//フォーム
const AuthInputFormAreaDiv = styled.div<{ height: string | undefined }>`
  height:${({ height }) => (height)};
  box-sizing:border-box;
  padding-top:1%;
`;

function SettingUserInputAuthList(props: propsType) {

    console.log("SettingUserInputAuthList render");

    const {
        selectAuthList,
        settingAuthInputInfo,
        changeAuthCombo,
        resetAuthList,
    } = useSettingUserInputAuthList({ ...props });

    return (
        <HeightDiv
            height='100%'
        >
            <AuthHeaderDiv
                height='8%'
            >
                <HeaderTitleDiv>
                    ユーザー権限設定
                    <IconComponent
                        icon={RxCross1}
                        onclick={settingAuthInputInfo}
                        style={{
                            "text-align": "right",
                            "position": "absolute",
                            "right": "2%",
                        }}
                    />
                </HeaderTitleDiv>
            </AuthHeaderDiv>
            <AuthInputFormAreaDiv
                height='80%'
            >
                <VerticalFlowDiv
                    height='100%'
                >
                    <SettingUserInputAuthListForm
                        selectAuthList={selectAuthList}
                        changeAuthCombo={changeAuthCombo}
                    />
                </VerticalFlowDiv>
            </AuthInputFormAreaDiv>
            <HeightDiv
                height='12%'
            >
                <SettingUserInputAuthListFooter
                    onclick={settingAuthInputInfo}
                    resetAuthList={resetAuthList}
                />
            </HeightDiv>
        </HeightDiv>
    );
}

export default SettingUserInputAuthList;