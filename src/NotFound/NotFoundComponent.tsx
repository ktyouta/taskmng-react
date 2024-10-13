import { Link } from "react-router-dom";
import styled from 'styled-components';

//引数の型
type porpType = {
    backUrl?: string,
    style?: { [key: string]: string }
}

//外側のスタイル
const OuterDiv = styled.div`
    box-sizing: border-box;
    padding-left: 8%;
    padding-top: 4%;
`;

function NotFoundComponent(props: porpType) {
    return (
        <OuterDiv
            style={props.style}
        >
            <h1>404 NOT FOUND</h1>
            <p>お探しのページが見つかりませんでした。</p>
            {
                props.backUrl &&
                <Link to={props.backUrl}>Topに戻る</Link>
            }
        </OuterDiv>
    )
}

export default NotFoundComponent;