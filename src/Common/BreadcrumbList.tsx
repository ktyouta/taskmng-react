import styled from 'styled-components';
import { breadcrumbType } from './Hook/useGetBreadcrumbList';
import React from 'react';


//パンくずリストのスタイル
const BreadcrumbDiv = styled.div`
    display:flex;
    gap: 5px;
`;

//パンくずリストの名称のスタイル
const BreadcrumbNameSpan = styled.span`
    
`;


//引数の型
type propsType = {
    breadcrumbList: breadcrumbType[],
    outerStyle?: { [key: string]: string, }
}


function BreadcrumbList(props: propsType) {

    console.log("BreadcrumbList render");

    return (
        <BreadcrumbDiv
            style={props.outerStyle}
        >
            {
                props.breadcrumbList.map((element, index) => {
                    return (
                        <React.Fragment>
                            <BreadcrumbNameSpan>
                                {element.name}
                            </BreadcrumbNameSpan>
                            {
                                index !== props.breadcrumbList.length - 1 &&
                                <span>
                                    &gt;
                                </span>
                            }
                        </React.Fragment>
                    );
                })
            }
        </BreadcrumbDiv>
    );
}

export default BreadcrumbList;