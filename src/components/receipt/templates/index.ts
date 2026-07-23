import { TemplateId } from "@/lib/types";
import { TemplateProps } from "./shared";
import { ModernGreenWallet } from "./ModernGreenWallet";
import { MidnightWallet } from "./MidnightWallet";
import { NeonTransfer } from "./NeonTransfer";
import { BusinessPayment } from "./BusinessPayment";
import { DigitalWalletPro } from "./DigitalWalletPro";
import { MobileMoney } from "./MobileMoney";
import { InstantTransfer } from "./InstantTransfer";
import { PremiumReceipt } from "./PremiumReceipt";

export const TEMPLATE_COMPONENTS: Record<TemplateId, (props: TemplateProps) => JSX.Element> = {
  "modern-green-wallet": ModernGreenWallet,
  "midnight-wallet": MidnightWallet,
  "neon-transfer": NeonTransfer,
  "business-payment": BusinessPayment,
  "digital-wallet-pro": DigitalWalletPro,
  "mobile-money": MobileMoney,
  "instant-transfer": InstantTransfer,
  "premium-receipt": PremiumReceipt,
};

export type { TemplateProps };
