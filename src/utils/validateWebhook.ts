import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const validateWebhook = (
  req: NextApiRequest,
  res: NextApiResponse
): boolean => {
  const signature = req.headers["x-hub-signature"];
  if (!signature || !WEBHOOK_SECRET) {
    res.status(400).json({ error: "Invalid webhook signature" });
    return false; // Return false when validation fails
  }

  const body = JSON.stringify(req.body);
  const hash = `sha256=${crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex")}`;

  if (signature !== hash) {
    res.status(400).json({ error: "Invalid webhook signature" });
    return false; // Return false when validation fails
  }

  return true; // Return true when validation succeeds
};
