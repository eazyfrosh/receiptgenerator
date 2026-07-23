export type ReceiptStatus = "Completed" | "Pending" | "Failed";

export type TemplateId =
  | "modern-green-wallet"
  | "midnight-wallet"
  | "neon-transfer"
  | "business-payment"
  | "digital-wallet-pro"
  | "mobile-money"
  | "instant-transfer"
  | "premium-receipt";

export interface ReceiptData {
  templateId: TemplateId;
  senderName: string;
  recipientName: string;
  amount: string;
  currency: string;
  date: string;
  time: string;
  transactionId: string;
  referenceNumber: string;
  note: string;
  status: ReceiptStatus;
  avatarDataUrl: string | null;
  paymentMethod: string;
  receiptNumber: string;
  balanceAfter: string;
}

export interface Project {
  id: string;
  name: string;
  data: ReceiptData;
  updatedAt: number;
}

export const TEMPLATE_META: Record<
  TemplateId,
  { name: string; description: string }
> = {
  "modern-green-wallet": {
    name: "Modern Green Wallet",
    description: "Clean mint-on-ink card with a soft glow header.",
  },
  "midnight-wallet": {
    name: "Midnight Wallet",
    description: "Deep navy glass card with violet accents.",
  },
  "neon-transfer": {
    name: "Neon Transfer",
    description: "High-contrast dark card with electric gradient trims.",
  },
  "business-payment": {
    name: "Business Payment",
    description: "Structured ledger-style layout for formal invoices.",
  },
  "digital-wallet-pro": {
    name: "Digital Wallet Pro",
    description: "Bold split-header wallet card with stat chips.",
  },
  "mobile-money": {
    name: "Mobile Money",
    description: "Compact mobile-first ticket with a torn-edge base.",
  },
  "instant-transfer": {
    name: "Instant Transfer",
    description: "Motion-forward arrow layout emphasizing speed.",
  },
  "premium-receipt": {
    name: "Premium Receipt",
    description: "Editorial serif-accented receipt for a premium feel.",
  },
};

export const TEMPLATE_ORDER: TemplateId[] = [
  "modern-green-wallet",
  "midnight-wallet",
  "neon-transfer",
  "business-payment",
  "digital-wallet-pro",
  "mobile-money",
  "instant-transfer",
  "premium-receipt",
];

export const PAYMENT_METHODS = [
  "Studio Pay Balance",
  "Linked Card",
  "Bank Transfer",
  "Mobile Wallet",
  "QR Pay",
];

export const CURRENCIES = ["USD", "EUR", "GBP", "NGN", "KES", "GHS", "ZAR", "INR"];

export const FICTIONAL_NOTICE = "FICTIONAL — FOR ENTERTAINMENT ONLY — NOT A REAL TRANSACTION";
