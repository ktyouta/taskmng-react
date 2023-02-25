import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import { masterDataListContext } from '../Main/Main';
import useWorkHistory from './Hook/useWorkHistory';
import './css/WorkHistory.css';

export type workHistoryType = {
  time: string,
  userName: string,
  editMaster: string,
  editData: string,
  editType: string
}

function WorkHistory() {

  console.log("WorkHistory render");

  //WorkHistoryのビジネスロジック
  const { workDisplayList } = useWorkHistory();

  return (
    <div className="workhistory">
      <div className="workhistory-main-area">
        <div>作業履歴</div>
        {
          !workDisplayList || workDisplayList.length < 1 ? <span className="workhistory-message">作業履歴がありません。</span> :
            <ul className='workhistory-ul-list'>
              {
                workDisplayList.map((element, i) => {
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
      </div>
    </div>
  );
}

export default WorkHistory;