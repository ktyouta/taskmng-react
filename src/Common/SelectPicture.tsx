import { useState } from "react";
import { Image } from 'react-bootstrap';
import { useUserImageCrop } from "./Hook/useUserImageCrop";
import { useImageSave } from "./Hook/useImageSave";
import { TrimmingModal } from "./TrimmingModal";
import ReactCrop from "react-image-crop";

export const SelectPicture = ({ type }: { type: number }) => {
    const [show, setShow] = useState(false);
    const [src, setSrc] = useState<string>('');
    const [result, setResult] = useState<any>();
    const [imageInput, setImageInput] = useState<any>({ type });
    const [isHover, setIsHover] = useState(false);

    const [crop, setCrop, setImage] = useUserImageCrop(
        type,
        imageInput,
        setImageInput,
        setResult
    );
    const [saveCroppedImg] = useImageSave(setShow, imageInput);

    const handleFileChange = (e: any) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setShow(true);
    };

    return (
        <>
            <label>
                <Image
                    src={result}
                    roundedCircle
                    style={{
                        maxWidth: 350,
                        border: 'solid 1px',
                        cursor: 'pointer',
                        opacity: isHover ? 0.8 : 1,
                        boxShadow: isHover ? '1px 1px 5px 1px #000' : 'none',
                        transform: isHover ? 'translateY(-2px)' : 'none',
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                />
                <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </label>

            <TrimmingModal
                show={show}
                setShow={setShow}
                saveCroppedImg={saveCroppedImg}
            >
                {/* <ReactCrop
                    //src={src}
                    onImageLoaded={setImage}
                    crop={crop}
                    onChange={setCrop}
                /> */}
                <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    //onImageLoaded={setImage}
                    aspect={1}
                >
                    <img src={src} alt="" style={{ width: "30%", height: "30%" }} />
                </ReactCrop>
            </TrimmingModal>
        </>
    );
};