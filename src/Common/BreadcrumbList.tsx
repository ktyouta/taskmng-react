import styled from 'styled-components';
import { breadcrumbType } from './Hook/useGetBreadcrumbList';
import React from 'react';
import useBreadcrumbList from './Hook/useBreadcrumbList';


//パンくずリストのスタイル
const BreadcrumbDiv = styled.div`
    display:flex;
    gap: 5px;
`;

//パンくずリストの名称のスタイル
const BreadcrumbNameSpan = styled.span<{ isLink: boolean, isExistSubMenu: boolean | undefined }>`
  cursor:${({ isLink, isExistSubMenu }) => (isLink && !isExistSubMenu ? "pointer" : "")};
  color:${({ isLink, isExistSubMenu }) => (isLink && !isExistSubMenu ? "blue" : "")};
  text-decoration:${({ isLink, isExistSubMenu }) => (isLink && !isExistSubMenu ? "underline" : "")};
  font-weight:${({ isExistSubMenu }) => (isExistSubMenu ? "bold" : "")};
`;

//引数の型
type propsType = {
    breadcrumbList: breadcrumbType[],
    outerStyle?: { [key: string]: string, }
}


function BreadcrumbList(props: propsType) {

    console.log("BreadcrumbList render");

    const { clickBreadcrumb } = useBreadcrumbList();

    return (
        <BreadcrumbDiv
            style={props.outerStyle}
        >
            {
                props.breadcrumbList.map((element, index) => {
                    return (
                        <React.Fragment>
                            <BreadcrumbNameSpan
                                //パンくずリストの最後尾
                                isLink={index !== props.breadcrumbList.length - 1}
                                //サブメニューを保持しているメニュー
                                isExistSubMenu={
                                    element.menuObj?.subCategoryList &&
                                    element.menuObj.subCategoryList.length > 0
                                }
                                onClick={() => {
                                    if (element.menuObj?.subCategoryList &&
                                        element.menuObj.subCategoryList.length > 0) {
                                        return;
                                    }
                                    clickBreadcrumb(element.path);
                                }}
                            >
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