"use user";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const AddMail = () => {
  const { user } = useUser();

  const fname = user?.firstName;
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  console.log(fname, "address:" + userEmail);

  const handleClick = async () => {
    try {
      const response = await axios.post("/api/mail", {
        email: "test@mail.com", // Replace with user data
        // Other data if needed
      });
      return { props: { message: response.data } }; // Optional props for rendering
    } catch (error) {
      console.error(error);
      return { props: { error: "Something went wrong" } }; // Handle errors
    }
  };

  return (
    <div>
      <button className="bg-neutral-900" onClick={handleClick}>
        Add User to Mailchimp
      </button>
    </div>
  );
};

export default AddMail;