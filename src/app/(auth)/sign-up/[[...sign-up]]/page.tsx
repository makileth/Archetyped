import { SignUp } from "@clerk/nextjs";

export default function Page() {

  return (
    <section className="max-w-4xl flex min-h-[100vh] mx-auto justify-center items-center ">
      <div className="flex w-full h-full justify-center mt-[8rem]">
        <SignUp />
      </div>
    </section>

  );
}