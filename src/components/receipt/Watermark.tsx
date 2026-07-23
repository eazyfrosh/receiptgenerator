import { FICTIONAL_NOTICE } from "@/lib/types";

const ROWS = 7;
const COLS = 3;

/**
 * Full-bleed, rotated, repeated watermark. It is rendered as part of the
 * same DOM subtree that gets captured for PNG/JPG/PDF export, and as tiled
 * text (not a single corner badge) so no crop of the receipt can remove it.
 * This is intentionally not user-configurable or hideable.
 *
 * Rows alternate between a dark-ink tone and a white tone. Templates range
 * from near-black to near-white backgrounds (and some split both in one
 * card), so no single ink color stays legible everywhere — alternating
 * rows guarantees at least half of them contrast with whatever is behind
 * them, on every template, independent of the dashboard's own light/dark
 * mode toggle.
 */
export function Watermark() {
  return (
    <div className="fictional-watermark" aria-hidden={false}>
      <div className="fictional-watermark-band">
        {Array.from({ length: ROWS }).map((_, row) => (
          <div
            className={`fictional-watermark-row ${
              row % 2 === 0 ? "fictional-watermark-row-dark" : "fictional-watermark-row-light"
            }`}
            key={row}
          >
            {Array.from({ length: COLS }).map((_, col) => (
              <span key={col}>{FICTIONAL_NOTICE}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
