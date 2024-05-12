"use client";

import CocCharSheet from "../../../../../components/forms/CocCharSheet";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <CocCharSheet
      submitPath={`cocCharSheets/${params.id}`}
      method="PUT"
      paramsId={params.id}
      isReadOnly={false}
    />
  );
};
export default Page;
