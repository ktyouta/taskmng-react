import styled from 'styled-components';
import { RxCross1 } from 'react-icons/rx';
import { HeaderDiv, HeightDiv, VerticalFlowDiv } from '../../Common/StyledComponent/CommonStyledComponent';
import IconComponent from '../../Common/IconComponent';
import { authType } from '../../Common/Hook/useCheckAuth';
import useSettingUserInputAuthList from './Hook/useSettingUserInputAuthList';


//引数の型
type propsType = {
    closeFn?: () => void,
    inputUserAuthList: authType[],
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
  padding-top:4%;
`;

function SettingUserInputAuthList(props: propsType) {

    console.log("SettingUserInputAuthList render");

    const { selectAuthList } = useSettingUserInputAuthList({ ...props });

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
                        onclick={props.closeFn}
                        style={{
                            "text-align": "right",
                            "position": "absolute",
                            "right": "2%",
                        }}
                    />
                </HeaderTitleDiv>
            </AuthHeaderDiv>
            <AuthInputFormAreaDiv
                height='77%'
            >
                <VerticalFlowDiv
                    height='85%'
                >

                </VerticalFlowDiv>
            </AuthInputFormAreaDiv>
            <HeightDiv
                height='15%'
            >
            </HeightDiv>
        </HeightDiv>
    );
}

export default SettingUserInputAuthList;