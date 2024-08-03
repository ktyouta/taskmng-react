import React, { ChangeEvent, FormEvent, forwardRef, useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import { Crop } from "react-image-crop";
//import "react-image-crop/dist/ReactCrop.css";


//参照の型
export type refType = {
    refValue?: string,
    clearValue: () => void
}

//引数の型
type propsType = {
    fileData: File | undefined,
    objectUrl: string,
    setObjectUrl: React.Dispatch<React.SetStateAction<string>>
}

const CropComponent = forwardRef<refType, propsType>((props, ref) => {

    //ファイル
    //const [fileData, setFileData] = useState<File | undefined>();
    //画像URL
    //const [props.objectUrl, props.setObjectUrl] = useState<string | undefined>();
    //プロフィールイメージ
    const [profileImg, setProfileImg] = useState<string>("");

    //画像のURLを割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: props.objectUrl,
        clearValue: clearInput
    }));

    //URLのクリアイベント
    const clearInput = () => {
        props.setObjectUrl("");
    };

    //Crop
    const [crop, setCrop] = useState<Crop>({
        unit: "px", // 'px' または '%' にすることができます
        x: 0,
        y: 0,
        width: 200,
        height: 200,
    });

    //アップロードした画像のObjectUrlをステイトに保存する
    useEffect(() => {
        // if (props.fileData instanceof File) {
        //     props.objectUrl && URL.revokeObjectURL(props.objectUrl);
        //     props.setObjectUrl(URL.createObjectURL(props.fileData));
        // } else {
        //     props.setObjectUrl("");
        // }
    }, [props.fileData]);

    //切り取った画像のObjectUrlを作成し、ステイトに保存する
    const makeProfileImgObjectUrl = async () => {
        if (props.objectUrl) {
            const canvas = document.createElement("canvas");
            canvas.width = crop.width ?? 0;
            canvas.height = crop.height ?? 0;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.beginPath();
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 2,
                0,
                2 * Math.PI,
                false
            );
            ctx.clip();

            const img = await loadImage(props.objectUrl);

            ctx.drawImage(
                img,
                crop.x ?? 0,
                crop.y ?? 0,
                crop.width ?? 0,
                crop.height ?? 0,
                0,
                0,
                crop.width ?? 0,
                crop.height ?? 0
            );

            canvas.toBlob((result) => {
                if (result instanceof Blob) setProfileImg(URL.createObjectURL(result));
            });
        }
    };

    // canvasで画像を扱うため
    // アップロードした画像のObjectUrlをもとに、imgのHTMLElementを作る
    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
        });
    };

    return (
        <div>
            <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    makeProfileImgObjectUrl();
                }}
            >
                {/* <input
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.target.files && setFileData(e.target.files[0]);
                    }}
                /> */}
                <button>切り取り</button>
            </form>
            <div>
                {props.objectUrl && (
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        circularCrop={true}
                        keepSelection={true}
                        aspect={1}
                    >
                        <img src={props.objectUrl} alt="" style={{ width: "30%", height: "30%" }} />
                    </ReactCrop>
                )}
            </div>
            <div>
                {profileImg ? <img src={profileImg} alt="プロフィール画像" /> : ""}
            </div>
        </div>
    );
});

export default CropComponent;