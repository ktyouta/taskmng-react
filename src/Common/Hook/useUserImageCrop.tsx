import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useUserImageCrop = (
    type: number,
    imageInput: any,
    setImageInput: Dispatch<SetStateAction<any>>,
    setResult: Dispatch<SetStateAction<any>>
) => {
    const [crop, setCrop] = useState<any>({
        aspect: 1 / 1,
        width: 300,
        height: 300,
    });
    const [image, setImage] = useState<any>(null);

    useEffect(() => {
        if (image) {
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx: any = canvas.getContext('2d');

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL('image/jpeg');
            const base64 = base64Image.split(',')[1];

            setResult(base64Image);
            setImageInput({ ...imageInput, type, base64 });
        }
    }, [crop]);

    return [crop, setCrop, setImage];
};