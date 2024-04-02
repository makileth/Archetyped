import React from "react";

const SectionLabel = ({
  labelText,
  darkmode,
}: {
  labelText: string;
  darkmode: boolean;
}) => {
  return (
    <div className="flex flex-row gap-2 py-2 items-center justify-start">
      <div className="bg-primary rounded-full w-1.5 h-1.5" />
      <p className={`${darkmode ? 'text-white' : 'text-neutral-700'} text-sm font-bold`}>{labelText}</p>
    </div>
  );
};

export default SectionLabel;
