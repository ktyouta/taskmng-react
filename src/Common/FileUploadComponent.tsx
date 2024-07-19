import React, { InputHTMLAttributes, forwardRef, useRef, useState } from "react";

export type Props = {
    onChange: () => void;
    id: InputHTMLAttributes<HTMLInputElement>["id"];
};

//参照の型
export type refType = {
    refValue: File | null,
    clearValue: () => void
}

const FileUploadComponent = forwardRef<refType, Props>((props, ref) => {

    //アップロードファイル
    const [imageFile, setImageFile] = useState<File | null>(null);

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
        if (e.currentTarget?.files && e.currentTarget.files[0]) {
            const targetFile = e.currentTarget.files[0];
            setImageFile(targetFile);
        }

        if (props.onChange) props.onChange();
    };

    return (
        <input
            id={props.id}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
        />
    );
}
);

export default FileUploadComponent;