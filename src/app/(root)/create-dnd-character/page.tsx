"use client";

import DndCharSheet from "../../../../components/forms/DndCharSheet";
import CharSheet from "../../../../components/forms/DndCharSheet";

const Page = () => {
  return <DndCharSheet submitPath="CharSheets" method="POST" isReadOnly={false}/>;
};

export default Page;
