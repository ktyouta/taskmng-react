import TagsComponent from '../Common/TagsComponent';
import './css/MemoList.css';
import styled from 'styled-components';


//引数の型
type propsType = {
    height: string,
    width: string,
}


//タグのスタイル
const TagDiv = styled.div<{ height: string, width: string, }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    background-color:white;
    display:flex;
    align-items: center;
    margin-bottom:1%;
`;



function MemoTag(props: propsType) {

    console.log("MemoTag render");

    return (
        <TagsComponent
            suggestions={[]}
        />
    );
}

export default MemoTag;