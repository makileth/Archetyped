import React, { useEffect } from "react";

const FileUpload: React.FC = () => {
  useEffect(() => {
    const URLreciever: HTMLInputElement | null = document.getElementById(
      "URLreciever"
    ) as HTMLInputElement;
    const img: HTMLImageElement | null = document.getElementById(
      "img"
    ) as HTMLImageElement;

    if (URLreciever && img) {
      URLreciever.value = img.src;
      URLreciever.addEventListener("input", () => {
        img.src = URLreciever.value;
      });
    }
  }, []);

  return (
    <div>
      <div>
        <img
          src=""
          alt=""
          id="img"
          className="w-[15rem] h-[20rem] rounded-2xl object-cover "
        />
      </div>
      <div>
        <input
          type="text"
          id="URLreciever"
          className="w-[10rem] bg-white h-[2rem] shadow-lg rounded-2xl text-black p-4 text-[12px] my-3"
          placeholder="Img Url here!"
        />
      </div>
    </div>
  );
};

export default FileUpload;
