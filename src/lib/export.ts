import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";

// The capture clone keeps the node's computed margin (e.g. the mx-auto
// centering margin from the preview pane) while the capture viewport is
// sized to the node itself — a nonzero margin shifts the card sideways out
// of frame and clips it. Zero it for the clone only; the live DOM node is
// untouched.
const CAPTURE_OPTIONS: Parameters<typeof toPng>[1] = {
  pixelRatio: 2,
  cacheBust: true,
  style: { margin: "0" },
};

async function prepareCapture(node: HTMLElement): Promise<void> {
  if (typeof document !== "undefined" && "fonts" in document) {
    await document.fonts.ready;
  }
  // If the user exports right after switching templates, the framer-motion
  // enter transition (opacity/scale) may still be running — capturing then
  // bakes a washed-out, half-faded frame into the export. Wait for any
  // in-flight animations in the captured subtree to finish, with a hard
  // ceiling so a perpetual animation can never block the export.
  if (typeof node.getAnimations === "function") {
    // Skip infinite animations (e.g. a template's decorative shimmer) —
    // their `finished` never resolves, and they don't affect the captured
    // frame's correctness the way the one-shot enter transition does.
    const finite = node.getAnimations({ subtree: true }).filter((a) => {
      const iterations = a.effect?.getTiming().iterations;
      return iterations !== Infinity;
    });
    if (finite.length) {
      await Promise.race([
        Promise.allSettled(finite.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 800)),
      ]);
    }
  }
  await new Promise((r) => requestAnimationFrame(() => r(undefined)));
}

export async function exportPng(node: HTMLElement, filename: string) {
  await prepareCapture(node);
  const dataUrl = await toPng(node, CAPTURE_OPTIONS);
  downloadDataUrl(dataUrl, `${filename}.png`);
}

export async function exportJpg(node: HTMLElement, filename: string) {
  await prepareCapture(node);
  const dataUrl = await toJpeg(node, {
    ...CAPTURE_OPTIONS,
    quality: 0.95,
    backgroundColor: "#ffffff",
  });
  downloadDataUrl(dataUrl, `${filename}.jpg`);
}

export async function exportPdf(node: HTMLElement, filename: string) {
  await prepareCapture(node);
  const dataUrl = await toPng(node, CAPTURE_OPTIONS);
  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve) => (img.onload = resolve));

  const widthPt = img.width * 0.75;
  const heightPt = img.height * 0.75;
  const pdf = new jsPDF({
    orientation: widthPt > heightPt ? "landscape" : "portrait",
    unit: "pt",
    format: [widthPt, heightPt],
  });
  pdf.addImage(dataUrl, "PNG", 0, 0, widthPt, heightPt);
  pdf.save(`${filename}.pdf`);
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
