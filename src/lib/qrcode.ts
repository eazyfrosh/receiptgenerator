import QRCode from "qrcode";

export async function generateQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    margin: 1,
    width: 240,
    color: {
      dark: "#12131A",
      light: "#00000000",
    },
  });
}
