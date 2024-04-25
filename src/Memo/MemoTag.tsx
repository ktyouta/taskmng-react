import TagsComponent, { tagType } from '../Common/TagsComponent';
import './css/MemoList.css';
import styled from 'styled-components';


//引数の型
type propsType = {
    height: string,
    width: string,
    tagList: tagType[],
    suggestions: tagType[],
    addTag: (newTag: tagType) => void,
    deleteTag: (tagIndex: number) => void,
}


//タグのスタイル
const TagDiv = styled.div<{ height: string, width: string, }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
    background-color:white;
    margin-bottom:1%;
`;



function MemoTag(props: propsType) {

    console.log("MemoTag render");

    return (
        <TagDiv
            height={props.height}
            width={props.width}
        >
            <TagsComponent
                suggestions={props.suggestions}
                tagList={props.tagList}
                addTag={props.addTag}
                deleteTag={props.deleteTag}
            />
        </TagDiv>
    );
}

export default MemoTag;