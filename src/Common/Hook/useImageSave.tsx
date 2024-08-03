import { Dispatch, SetStateAction } from "react";

export const useImageSave = (
    setShow: Dispatch<SetStateAction<boolean>>,
    imageInput: any
) => {
    const saveCroppedImg = async () => {
        try {
            console.log('imageInputを登録');
        } catch (err) {
            console.log(err);
        }

        setShow(false);
    };

    return [saveCroppedImg];
};