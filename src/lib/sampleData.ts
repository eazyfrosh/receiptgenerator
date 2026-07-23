import { ReceiptData } from "./types";

export function createDefaultReceipt(): ReceiptData {
  const now = new Date();
  return {
    templateId: "modern-green-wallet",
    senderName: "Ada Studio",
    recipientName: "Chidi Okafor",
    amount: "128.50",
    currency: "USD",
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 5),
    transactionId: "PROP-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
    referenceNumber: "REF-" + Math.floor(100000 + Math.random() * 900000),
    note: "Prop receipt for scene 4B",
    status: "Completed",
    avatarDataUrl: null,
    paymentMethod: "Studio Pay Balance",
    receiptNumber: "RC-" + Math.floor(10000 + Math.random() * 90000),
    balanceAfter: "1,204.10",
  };
}
