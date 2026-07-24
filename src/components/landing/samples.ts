import { ReceiptData, TemplateId } from "@/lib/types";

// Deterministic sample receipts for the marketing previews. These are fixed
// (never random / Date.now()) so the server-rendered HTML and the client
// hydration match exactly — a random transaction ID or timestamp would
// otherwise differ between the two passes and trigger a hydration mismatch.
function sample(
  templateId: TemplateId,
  overrides: Partial<ReceiptData> = {}
): ReceiptData {
  return {
    templateId,
    senderName: "Ada Studio",
    recipientName: "Chidi Okafor",
    amount: "128.50",
    currency: "USD",
    date: "2026-02-14",
    time: "14:32",
    transactionId: "PROP-8F2K9QX1",
    referenceNumber: "REF-448210",
    note: "Prop receipt for scene 4B",
    status: "Completed",
    avatarDataUrl: null,
    paymentMethod: "Studio Pay Balance",
    receiptNumber: "RC-40318",
    balanceAfter: "1,204.10",
    ...overrides,
  };
}

export const HERO_SAMPLE = sample("modern-green-wallet");

export const PREVIEW_SAMPLES: ReceiptData[] = [
  sample("midnight-wallet", {
    senderName: "Nova Films",
    recipientName: "Priya Nair",
    amount: "2,450.00",
    transactionId: "PROP-K17DQ3ZP",
    referenceNumber: "REF-903112",
    receiptNumber: "RC-77812",
    note: "Set dressing — episode 2",
  }),
  sample("neon-transfer", {
    senderName: "Kai Mensah",
    recipientName: "Lena Rossi",
    amount: "76.00",
    status: "Pending",
    transactionId: "PROP-QZ88M2AA",
    referenceNumber: "REF-220417",
    receiptNumber: "RC-10233",
    note: "Parody sketch prop",
  }),
  sample("premium-receipt", {
    senderName: "Studio Vale",
    recipientName: "Marcus Bell",
    amount: "540.00",
    transactionId: "PROP-77XKD9QM",
    referenceNumber: "REF-661900",
    receiptNumber: "RC-58120",
    note: "UI mockup demo",
  }),
];
