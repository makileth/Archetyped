import PricingCard from "../cards/PricingCard";

const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

export default function Pricing() {
  return (
    <div className="bg-white  py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Join the <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Guild</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dive into our pricing tiers, where you can choose the level of
            customization and assistance that best fulfills your character
            creation dreams. We offer affordable options without compromising
            quality or creativity.
          </p>
        </div>
        <div className="mx-auto mt-16 w-full sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <PricingCard />
        </div>
      </div>
    </div>
  );
}
