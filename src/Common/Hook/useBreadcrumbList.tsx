import React, { useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import useChangeUrlFunction from './useChangeUrlFunction';
import { generalDataType, menuListType } from '../Type/CommonType';
import { HeaderTestIdPrefix } from '../../tests/AppTest/DataTestId';
import { useNavigate } from 'react-router-dom';


/**
 * パンくずリストのイベント
 * @param url 
 * @returns 
 */
function useBreadcrumbList() {

    //ルーティング用
    const navigate = useNavigate();

    /**
     * パンくずのリンク押下イベント
     */
    function clickBreadcrumb(path: string) {
        navigate(path);
    }

    return {
        clickBreadcrumb
    };
}

export default useBreadcrumbList;