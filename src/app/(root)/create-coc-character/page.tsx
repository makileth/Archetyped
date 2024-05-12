"use client";

import CocCharSheet from "../../../../components/forms/CocCharSheet";
import CharSheet from "../../../../components/forms/DndCharSheet";

const Page = () => {
  return (
    <CocCharSheet submitPath="cocCharSheets" method="POST" isReadOnly={false} />
  );
};

export default Page;
