import React, { useState } from 'react';
import '../App.css';
import useTaskList from './Hook/useTaskListContent';
import TaskContent from './TaskContent';
import { displayTaskListType } from './Type/TaskType';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import './css/TaskList.css';


//引数の型
type propsType = {
    displayTaskList: displayTaskListType[]
}

/**
 * 日付の文字列変換
 */
const getNowDate = (now: Date) => {
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    return `${year}${month}${date}`;
};

//ステータス
const NOCOMP_STATUS = "未対応";
const HOLD_STATUS = "保留";
const COMP_STATUS = "完了";


function TaskList(props: propsType) {

    console.log("TaskList render");

    //現在日時
    const nowDate = getNowDate(new Date());

    return (
        <div className="tasklist">
            <ul>
                {
                    props.displayTaskList.map((element) => {
                        let bdColor:string | undefined = undefined;
                        let titleBgColor:string | undefined = undefined;
                        let infoBgColor:string | undefined = undefined;

                        //期限切れのタスク
                        if (element.limitTime < nowDate) {
                            switch (element.status) {
                                //未対応、保留
                                case NOCOMP_STATUS || COMP_STATUS:
                                    bdColor = "#CD5C5C";
                                    titleBgColor = "#F08080";
                                    infoBgColor = "#FA8072";
                                    break;
                            }
                        }

                        //完了したタスク
                        if (element.status === COMP_STATUS) {
                            bdColor = "#808080";
                            titleBgColor = "#808080";
                            infoBgColor = "#808080";
                        }

                        return (
                            <React.Fragment>
                                <li key={element.id}>
                                    <TaskContent
                                        displayTaskList={element}
                                        bdColor={bdColor}
                                        titleBgColor={titleBgColor}
                                        infoBgColor={infoBgColor}
                                    />
                                </li>
                                <VerticalSpaceComponent
                                    space='2%'
                                />
                            </React.Fragment>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default TaskList;