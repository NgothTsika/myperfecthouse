"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      uploadPreset="CHAT-APP"
      onSuccess={handleUpload}
      options={{
        maxFiles: 1,
        multiple: false,
        sources: ["local", "camera"],
        cropping: false, // or true if you want to allow cropping
        resourceType: "image",
      }}
      // className="cursor-pointer hover:opacity-75 transition"
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="text-neutral-600 gap-4 items-center justify-center flex-col flex border-neutral-300 p-20 border-2 border-dashed transition hover:opacity-70 cursor-pointer relative "
          >
            <TbPhotoPlus size={50} />
            <div className=" font-semibold text-lg ">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
