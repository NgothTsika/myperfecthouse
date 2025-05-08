// "use client";

// import { useCallback } from "react";

// declare global {
//   var cloudinary: any;
// }

// interface ImageUploadProps {
//   onChange: (value: string) => void;
//   value: string;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
//   const handleUpload = useCallback(
//     (result: any) => {
//       onChange(result.info.secure_url);
//     },
//     [onChange]
//   );
//   return (
//     <CldUploadWidget
//       onUpload={handleUpload}
//       uploadPreset=""
//       options={{ maxFiles: 1 }}
//     >
//       {({ open }) => {
//         return <div onClick={() => open?.()}></div>;
//       }}
//     </CldUploadWidget>
//   );
// };

// export default ImageUpload;
