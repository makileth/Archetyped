"use client";
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Ban } from "lucide-react";
const PricingCard = () => {
  const router = useRouter();
  const user = useUser();

  const handleFreeTier = () => {
    if (user) {
      toast("You are already signed in! Enjoy!");
    } else {
      router.push("/sign-in");
    }
  };

  const handleProTier = () => {
    if (user) {
      toast("Coming soon. Thanks for your interest!");
    } else {
      router.push("/sign-in");
    }
  };

  const includedFeaturesExplorer = [
    "Character Creation",
    "Academy Resources",
    "Store up to 6 Characters at once",
  ];
  const notIncludedFeaturesExplorer = [
    "Customisable Templates",
    "Member-Only Newsletter",
  ];
  const includedFeaturesPro = [
    "Character Creation",
    "Premium Academy Resources",
    "Unlimited Characters",
    "Customisable Templates",
    "Member-Only Newsletter",
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-8 justify-center">
      <div className="w-full md:w-[40%] p-6 h-full rounded-2xl shadow-around-md border-neutral-400 rounded-10">
        <h2 className="font-bold text-neutral-700 text-[24px] mb-3 ml-[4px]">
          Explorer
        </h2>
        <div className="space-y-2 py-3">
          {includedFeaturesExplorer.map((feature) => (
            <li key={feature} className="flex gap-x-3 text-neutral-900">
              <CheckIcon
                className="h-6 w-5 flex-none text-primary"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
          {notIncludedFeaturesExplorer.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-x-[0.80rem] text-neutral-900"
            >
              <Ban
                className="h-[1.15rem] w-[1.15rem] flex-none text-neutral-800"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </div>

        <div className="-mt-2 p-2 lg:mt-[2.05rem] lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-neutral-50 py-10 text-center ring-1 ring-inset ring-neutral-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-semibold text-neutral-600">
                Sign up for Explorer
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl tracking-tight text-neutral-900">
                  $0.00
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-neutral-600">
                  USD
                </span>
              </p>
              <button
                onClick={handleFreeTier}
                className="mt-10 block w-full rounded-2xl duration-300 transition bg-neutral-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get access
              </button>
              <p className="mt-6 text-xs leading-5 text-neutral-600">
                Invoices and receipts available for easy company reimbursement
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[40%] p-6 h-full rounded-2xl shadow-around-md shadow-primary hover:shadow-around-xl hover:shadow-primary duration-300 transition ease-in-out border-neutral-400 rounded-10">
        <h2 className="font-bold text-primary text-[24px] mb-3 ml-[4px]">
          Pro
        </h2>
        <div className="space-y-2 py-3">
          {includedFeaturesPro.map((feature) => (
            <li key={feature} className="flex gap-x-3 text-neutral-900">
              <CheckIcon
                className="h-6 w-5 flex-none text-primary"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </div>

        <div className="-mt-2 p-2 lg:mt-[2.05rem] lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-neutral-50 py-10 text-center ring-1 ring-inset ring-neutral-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-semibold text-neutral-600">
                Monthly subscription
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl tracking-tight text-neutral-900">
                  $9.99
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-neutral-600">
                  USD
                </span>
              </p>
              <button
                onClick={handleProTier}
                className="mt-10 block w-full rounded-2xl duration-300 transition bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get access
              </button>
              <p className="mt-6 text-xs leading-5 text-neutral-600">
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
