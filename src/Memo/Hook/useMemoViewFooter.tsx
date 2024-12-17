import { useAtomValue } from "jotai";
import { memoAuthorityAtom } from "../Atom/MemoAtom";




function useMemoViewFooter() {

    //メモ画面の権限
    const memoAuthority = useAtomValue(memoAuthorityAtom);


    return {
        memoAuthority
    }
}

export default useMemoViewFooter;