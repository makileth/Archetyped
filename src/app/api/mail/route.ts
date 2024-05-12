import { NextApiRequest, NextApiResponse } from "next";

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "81ed3612440dab23f27fddf24ac70f11-us21",
  server: "us21",
});

export const handler = async () => {
  const listId = "f190b0a7fa";

  const run = async () => {
    const response = await client.lists.addListMember(listId, {
      email_address: "test22@mail.com",
      status: "subscribed",
    });
    console.log(response);
  };

  run();
};

handler();