import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const validateWebhook = (
  req: NextApiRequest,
  res: NextApiResponse
): boolean => {
  const signature = req.headers["x-hub-signature"];
  if (!signature || !WEBHOOK_SECRET) {
    console.error("❌ Missing signature or secret");
    return false;
  }

  const body = JSON.stringify(req.body);
  const hash = `sha256=${crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex")}`;

  if (signature !== hash) {
    console.error("❌ Invalid signature");
    return false;
  }

  return true;
};
