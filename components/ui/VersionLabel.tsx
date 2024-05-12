import Link from "next/link";
import React from "react";

const VersionLabel = ({ labelText }: { labelText: string }) => {
  return (
    <Link
      href="/changelog"
      className="flex flex-row hover:scale-[1.02] transition duration-300 gap-2 cursor-pointer items-center rounded-full p-[0.08rem] w-max bg-gradient-to-r from-neutral-800 to-primary justify-start"
    >
      <div className="w-full h-full py-[0.25rem] rounded-full px-8 bg-white">
        <p
          className={`text-neutral-900 text-xs mx-auto font-bold text-transparent bg-gradient-to-r from-neutral-800 to-primary bg-clip-text`}
        >
          {labelText}
        </p>
      </div>
    </Link>
  );
};

export default VersionLabel;
