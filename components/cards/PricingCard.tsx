import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
const PricingCard = () => {
  const includedFeaturesBasic = [
    "Character Creation",
    "Member resources",
    "Store up to 8 Characters at once",
  ];
  const includedFeaturesPro = [
    "Character Creation",
    "Member resources",
    "Store as many Characters as you wish",
    "Get a big thank-you",
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-8 justify-center">
      <div className="w-full md:w-[40%] p-6 h-full rounded-2xl border-[1.5px] border-solid border-gray-400 rounded-10">
        <h2 className="font-bold text-gray-700 text-[24px] mb-3 ml-[4px]">
          Explorer
        </h2>
        <div className="space-y-2 py-3">
          {includedFeaturesBasic.map((feature) => (
            <li key={feature} className="flex gap-x-3 text-black">
              <CheckIcon
                className="h-6 w-5 flex-none text-primary"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </div>

        <div className="-mt-2 p-2 lg:mt-[2.05rem] lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-semibold text-gray-600">
                Sign up for Basic
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  $0.00
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                  USD
                </span>
              </p>
              <a
                href="/sign-up"
                className="mt-10 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get access
              </a>
              <p className="mt-6 text-xs leading-5 text-gray-600">
                Invoices and receipts available for easy company reimbursement
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full md:w-[40%] p-6 rounded-2xl border-[1.5px] border-solid border-gray-400 rounded-10 shadow-lg shadow-primary hover:shadow-2xl hover:shadow-accent transition duration-300">
        <h2 className="font-bold text-gray-700 text-[24px] mb-3 ml-[4px] bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          Legend
        </h2>
        <div className="space-y-2 py-3">
          {includedFeaturesPro.map((feature) => (
            <li key={feature} className="flex gap-x-3 text-black">
              <CheckIcon
                className="h-6 w-5 flex-none text-accent"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </div>

        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-semibold text-gray-600">
                Monthly Pay
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  $9.99
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                  USD
                </span>
              </p>
              <a
                href="/sign-up"
                className="mt-10 block w-full rounded-md transition duration-300 bg-accent px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get access
              </a>
              <p className="mt-6 text-xs leading-5 text-gray-600">
                Invoices and receipts available for easy company reimbursement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
