export type XY = { x: number; y: number };

type Rect = { width: number; height: number };

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPositionInside(
  container: Rect,
  item: Rect,
  padding = 12,
): XY {
  const maxX = Math.max(padding, container.width - item.width - padding);
  const maxY = Math.max(padding, container.height - item.height - padding);

  const x = randomInt(padding, Math.max(padding, maxX));
  const y = randomInt(padding, Math.max(padding, maxY));

  return { x, y };
}

export function rectsOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
) {
  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  );
}

export function randomPositionAvoiding(
  container: Rect,
  item: Rect,
  avoid: { x: number; y: number; w: number; h: number } | null,
  padding = 12,
  tries = 40,
): XY {
  if (!avoid) return randomPositionInside(container, item, padding);

  for (let i = 0; i < tries; i++) {
    const p = randomPositionInside(container, item, padding);
    const candidate = { x: p.x, y: p.y, w: item.width, h: item.height };
    if (!rectsOverlap(candidate, avoid)) return p;
  }

  return randomPositionInside(container, item, padding);
}
