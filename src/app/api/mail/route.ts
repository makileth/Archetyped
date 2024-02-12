// import { useUser } from "@clerk/nextjs";
// const mailchimp = require("node-mailchimp");

// const user = useUser();

// if (user?.isLoaded && user?.isSignedIn) {
//   const userEmail = user.email; // Access the email property directly

//   // Proceed with adding to Mailchimp using userEmail
//   try {
//     await addToMailchimp(userEmail);
//     console.log("Contact added successfully!");
//   } catch (error) {
//     console.error("Failed to add contact to Mailchimp:", error);
//   }
// } else {
//   // Handle the case where user is not signed in or data is not loaded yet
//   console.log("User data not loaded or user not signed in.");
// }

// async function addToMailchimp(userEmail: string | undefined) {
//   if (!userEmail) {
//     console.error("User email not available, cannot add to Mailchimp");
//     return; // Or handle it differently, e.g., prompt user to provide email
//   }

//   const listId = "f190b0a7fa"; // Replace with your actual list ID
//   const client = new mailchimp(process.env.MAILCHIMP_API_KEY); // Use environment variable

//   await client.post(`/lists/${listId}/members`, { email_address: userEmail });
// }
