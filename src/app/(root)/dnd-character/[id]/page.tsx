"use client";


import DndCharSheet from "../../../../../components/forms/DndCharSheet";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <DndCharSheet
      submitPath={`CharSheets/${params.id}`}
      method="PUT"
      paramsId={params.id}
      isReadOnly={true}
    />
  );
};
export default Page;
