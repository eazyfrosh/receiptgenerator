import { ReceiptData, TEMPLATE_ORDER } from "./types";

const REQUIRED_STRING_FIELDS: (keyof ReceiptData)[] = [
  "senderName",
  "recipientName",
  "amount",
  "currency",
  "date",
  "time",
  "transactionId",
  "referenceNumber",
  "note",
  "status",
  "paymentMethod",
  "receiptNumber",
  "balanceAfter",
];

export function isValidReceiptData(value: unknown): value is ReceiptData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ReceiptData>;
  if (!candidate.templateId || !TEMPLATE_ORDER.includes(candidate.templateId)) return false;
  if (!["Completed", "Pending", "Failed"].includes(candidate.status as string)) return false;
  return REQUIRED_STRING_FIELDS.every((field) => typeof candidate[field] === "string");
}
