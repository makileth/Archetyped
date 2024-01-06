import GetStarted from "../ui/GetStarted";

export default function CTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-full text-center lg:mx-0 lg:flex-auto lg:py-32">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Unleash Your Imagination
              <br />
              <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Your Journey Awaits!</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
              Malesuada adipiscing sagittis vel nulla.
            </p>
            <div className="my-10 flex items-center justify-center gap-x-6 w-full mx-auto">
              <GetStarted />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
