import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import { masterDataListContext } from '../Main/Main';
import useWorkHistory from './Hook/useWorkHistory';
import './css/WorkHistory.css';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';

type propsType = {
    workDisplayList: string[],
    isLoading: boolean,
    isError: boolean,
}

function LoadingWorkHistoryList(props: propsType) {
    //ローディング
    if (props.isLoading) {
        return <Loading isLoading={true} />;
    }

    //エラー
    if(props.isError){
        return <div>エラーが発生しました。</div>;
    }

    return (
        <React.Fragment>
            {
                !props.workDisplayList || props.workDisplayList.length < 1 ? <span className="workhistory-message">作業履歴がありません。</span> :
                    <ul className='workhistory-ul-list'>
                        {
                            props.workDisplayList.map((element, i) => {
                                let key = `${Object.values(element).join("-")}-${i}`;
                                return (
                                    <li key={key}>
                                        {element}
                                    </li>
                                );
                            })
                        }
                    </ul>
            }
        </React.Fragment>
    );
}

export default LoadingWorkHistoryList;