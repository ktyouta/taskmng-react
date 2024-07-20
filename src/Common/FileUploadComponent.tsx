import React, { InputHTMLAttributes, forwardRef, useRef, useState } from "react";


//ファイルの型
type fileType = {
    fileObj: File | null,
    src: string,
}

//参照の型
export type refType = {
    refValue: fileType | null,
    clearValue: () => void
}

//引数の型
export type Props = {
    onChange: (e?: string,) => void;
    disabled?: boolean,
};

const FileUploadComponent = forwardRef<refType, Props>((props, ref) => {

    //アップロードファイル
    const [imageFile, setImageFile] = useState<fileType | null>(null);

    //テキストボックスの入力値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: imageFile,
        clearValue: clearInput
    }));

    //テキストボックスのクリアイベント
    const clearInput = () => {
        setImageFile(null);
    };

    //ファイルのアップロードイベント
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let src = "";
        if (e.target?.files && e.target.files[0]) {
            const targetFile = e.target.files[0];
            src = window.URL.createObjectURL(targetFile);
            setImageFile({
                fileObj: targetFile,
                src: src
            });
        }

        if (props.onChange) props.onChange(src);
    };

    return (
        <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={props.disabled}
        />
    );
}
);

export default FileUploadComponent;