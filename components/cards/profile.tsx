import { useUser } from "@clerk/nextjs";

function ProfilePage() {
  const { user } = useUser(); // retrieve the current user info from Clerk

  return (
    <div className="gap-6 px-6">
      {user ? ( // check if the user object is available
        <h1 className="text-black text-[42px] font-bold">
          Welcome,
          <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            {" "}
            {user.username}
          </span>
        </h1>
      ) : (
        <p className="text-black text-[24px] font-bold">Loading user data...</p>
      )}
      <p className="text-black text-[12px] font-semibold">
        Tip: Did you know that buttons were created in order to click on them?
        Cool right.
      </p>
    </div>
  );
}

export default ProfilePage;
