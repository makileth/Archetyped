import GetStartedDark from "../ui/getStarted/GetStartedDark";

export default function CTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto py-24 sm:py-32 px-2 lg:px-10">
        <div className="relative isolate overflow-hidden bg-neutral-900 px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="max-w-full text-center lg:mx-0 lg:flex-auto py-24 lg:py-32">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your Journey Awaits
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-200">
              Dive into a world of limitless possibilities and create characters
              that breathe life into your stories. Just a click away.
            </p>

            <div className="my-10 flex items-center justify-center gap-x-6 w-full mx-auto">
              <GetStartedDark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
