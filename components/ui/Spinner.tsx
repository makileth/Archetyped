import { useEffect, useState } from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin mx-auto my-auto rounded-full h-20 w-20 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default Spinner;
