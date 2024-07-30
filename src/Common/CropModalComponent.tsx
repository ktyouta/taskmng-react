import React, { useState, useCallback, forwardRef, useRef } from "react";
import { Area, MediaSize } from "react-easy-crop";
import CropperComponent from "./CropperComponent";
import ButtonComponent from "./ButtonComponent";
import ModalComponent from "./ModalComponent";
import useSwitch from "./Hook/useSwitch";
import styled from "styled-components";
import CropComponent from "./CropComponent";
export const ASPECT_RATIO = 6 / 1;
export const CROP_WIDTH = 400;



//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//引数の型
type propsType = {
    modalWidth?: string,
    modalHeight?: string,
}

//ボタンの基本スタイル
const ButtonStyle = styled.button<{ bgColor?: string }>`
    color: white;
    background-color: #00A0FF;
    border-radius: 4px;
`;

/**
 * urlをもとにimage要素を作成
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.src = url;
    });

/**
 * 画像トリミングを行い新たな画像urlを作成
 */
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area
): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return "";
    }

    // canvasサイズを設定
    canvas.width = image.width;
    canvas.height = image.height;

    // canvas上に画像を描画
    ctx.drawImage(image, 0, 0);

    // トリミング後の画像を抽出
    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    );

    // canvasのサイズ指定(切り取り後の画像サイズに更新)
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // 抽出した画像データをcanvasの左隅に貼り付け
    ctx.putImageData(data, 0, 0);

    // canvasを画像に変換
    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file !== null) resolve(URL.createObjectURL(file));
        }, "image/jpeg");
    });
}


const CropModalComponent = forwardRef<refType, propsType>((props, ref) => {

    // アップロードした画像URL
    const [imgSrc, setImgSrc] = useState("");
    // 画像の拡大縮小倍率
    const [zoom, setZoom] = useState(1);
    // 画像拡大縮小の最小値
    const [minZoom, setMinZoom] = useState(1);
    // 切り取る領域の情報
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    // 切り取る領域の情報
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
    // 切り取ったあとの画像URL
    const [croppedImgSrc, setCroppedImgSrc] = useState("");
    // input type=fileの参照
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();


    //ファイル
    const [fileData, setFileData] = useState<File | undefined>();
    //画像URL
    const [objectUrl, setObjectUrl] = useState<string | undefined>();
    //プロフィールイメージ
    const [profileImg, setProfileImg] = useState<string>("");



    //テキストボックスの入力値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: croppedImgSrc,
        clearValue: clearInput
    }));

    //テキストボックスのクリアイベント
    const clearInput = () => {
        setCroppedImgSrc("");
    };

    /**
     * ファイルアップロード後
     * 画像ファイルのURLをセットしモーダルを表示する
     */
    const onFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    if (reader.result) {
                        setImgSrc(reader.result.toString() || "");
                        onFlag();
                    }
                });
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        []
    );

    /**
     * Cropper側で画像データ読み込み完了
     * Zoomの最小値をセットしZoomの値も更新
     */
    const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
        const { width, height } = mediaSize;
        const mediaAspectRadio = width / height;
        if (mediaAspectRadio > ASPECT_RATIO) {
            // 縦幅に合わせてZoomを指定
            const result = CROP_WIDTH / ASPECT_RATIO / height;
            setZoom(result);
            setMinZoom(result);
            return;
        }
        // 横幅に合わせてZoomを指定
        const result = CROP_WIDTH / width;
        setZoom(result);
        setMinZoom(result);
    }, []);

    /**
     * 切り取り完了後、切り取り領域の情報をセット
     */
    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    /**
     * 切り取り後の画像を生成し画面に表示
     */
    const showCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
            setCroppedImgSrc(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imgSrc]);

    const handleButtonClick = () => {
        // input要素をクリックしてファイル選択ダイアログを開く
        fileInputRef.current?.click();
    };

    return (
        <div className="">
            <div className="file-upload-container">
                <ButtonStyle className="button" onClick={handleButtonClick}>
                    Upload File
                    <input type="file" ref={fileInputRef} hidden onChange={onFileChange} />
                </ButtonStyle>
            </div>
            <div className="img-container">
                {croppedImgSrc ? (
                    <img src={croppedImgSrc} alt="Cropped" className="img" />
                ) : (
                    <div className="no-img"></div>
                )}
            </div>
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
                width={props.modalWidth}
                height={props.modalHeight}
            >
                <CropComponent
                    fileData={fileData}
                />
            </ModalComponent>
        </div>
    );
});
export default CropModalComponent;
