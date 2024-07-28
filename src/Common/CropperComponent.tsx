import React from "react";
import Cropper, { Area, MediaSize } from "react-easy-crop";

export const ASPECT_RATIO = 6 / 1;
export const CROP_WIDTH = 400;

//引数の型
type propsType = {
    crop: {
        x: number;
        y: number;
    };
    setCrop: (crop: { x: number; y: number }) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
    imgSrc: string;
    showCroppedImage: () => void;
    onMediaLoaded: (mediaSize: MediaSize) => void;
    minZoom: number;
};

function CropperComponent(props: propsType) {

    return (
        <Cropper
            image={props.imgSrc}
            crop={props.crop}
            zoom={props.zoom}
            minZoom={props.minZoom}
            maxZoom={props.minZoom + 3}
            aspect={ASPECT_RATIO}
            onCropChange={props.setCrop}
            onCropComplete={props.onCropComplete}
            onZoomChange={props.setZoom}
            cropSize={{
                width: CROP_WIDTH,
                height: CROP_WIDTH / ASPECT_RATIO
            }}
            classes={{
                containerClassName: "container",
                cropAreaClassName: "crop-area",
                mediaClassName: "media"
            }}
            onMediaLoaded={props.onMediaLoaded}
            showGrid={false}
        />
    );
};
export default CropperComponent;
