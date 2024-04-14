import ReactPaginate from 'react-paginate';
import './css/PagenatetionComponent.css';
import React from 'react';

//引数の型
type propsType = {
    changePage: (nowPage: number) => void,
    totalPage: number,
}


function PagenatetionComponent(props: propsType) {

    return (
        <React.Fragment>
            {
                props.totalPage > 0 &&
                <ReactPaginate
                    pageCount={props.totalPage} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
                    marginPagesDisplayed={1} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
                    pageRangeDisplayed={3} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
                    onPageChange={(selectedItem: {
                        selected: number;
                    }) => {
                        props.changePage(selectedItem.selected);
                    }} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
                    containerClassName='pagination' //ページネーションリンクの親要素のクラス名
                    pageClassName='page-item' //各子要素(li要素)のクラス名
                    pageLinkClassName='page-link' //ページネーションのリンクのクラス名
                    activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます 
                    previousLabel='<' //前のページ番号に戻すリンクのテキスト
                    nextLabel='>' //次のページに進むボタンのテキスト
                    previousClassName='page-item' // '<'の親要素(li)のクラス名
                    nextClassName='page-item' //'>'の親要素(li)のクラス名
                    previousLinkClassName='page-link'  //'<'のリンクのクラス名
                    nextLinkClassName='page-link' //'>'のリンクのクラス名
                    disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
                    breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
                    breakClassName='page-item' // 上記の「…」のクラス名
                    breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
                />
            }
        </React.Fragment>
    );
}

export default PagenatetionComponent;