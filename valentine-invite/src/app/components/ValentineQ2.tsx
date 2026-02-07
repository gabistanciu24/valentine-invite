"use client";

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "../page.module.css";
import { randomPositionAvoiding, type XY } from "../utils/randomPosition";

type Props = {
  visible: boolean;
  onSure: () => void;
};

function ValentineQ2({ visible, onSure }: Props) {
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const sureRef = useRef<HTMLButtonElement | null>(null);
  const thinkRef = useRef<HTMLButtonElement | null>(null);
  const shakeTimerRef = useRef<number | null>(null);
  const armTimerRef = useRef<number | null>(null);

  const [surePos, setSurePos] = useState<XY>({ x: 0, y: 0 });
  const [thinkPos, setThinkPos] = useState<XY>({ x: 0, y: 0 });
  const [sureScale, setSureScale] = useState(1);
  const [shakeThink, setShakeThink] = useState(false);
  const [thinkClicks, setThinkClicks] = useState(0);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setArmed(false);
    if (armTimerRef.current) window.clearTimeout(armTimerRef.current);
    armTimerRef.current = window.setTimeout(() => setArmed(true), 350);
    return () => {
      if (armTimerRef.current) window.clearTimeout(armTimerRef.current);
    };
  }, [visible]);

  const moveThink = useCallback(() => {
    const arena = arenaRef.current;
    const sureBtn = sureRef.current;
    const thinkBtn = thinkRef.current;
    if (!arena || !sureBtn || !thinkBtn) return;

    const a = arena.getBoundingClientRect();
    const s = sureBtn.getBoundingClientRect();
    const t = thinkBtn.getBoundingClientRect();

    const avoid = {
      x: s.left - a.left,
      y: s.top - a.top,
      w: s.width,
      h: s.height,
    };

    const next = randomPositionAvoiding(
      { width: a.width, height: a.height },
      { width: t.width, height: t.height },
      avoid,
      12,
      70,
    );

    setThinkPos(next);
    setShakeThink(true);
    if (shakeTimerRef.current) window.clearTimeout(shakeTimerRef.current);
    shakeTimerRef.current = window.setTimeout(() => setShakeThink(false), 220);
  }, []);

  useLayoutEffect(() => {
    if (!visible) return;
    const arena = arenaRef.current;
    const sureBtn = sureRef.current;
    const thinkBtn = thinkRef.current;
    if (!arena || !sureBtn || !thinkBtn) return;

    const a = arena.getBoundingClientRect();
    const hero = document.querySelector<HTMLElement>("[data-hero-frame]");
    const h = hero?.getBoundingClientRect();

    const centerX = (h ? h.left + h.width / 2 : a.left + a.width / 2) - a.left;
    const centerY = (h ? h.top + h.height / 2 : a.top + a.height / 2) - a.top;

    const s = sureBtn.getBoundingClientRect();
    const t = thinkBtn.getBoundingClientRect();

    const offsetY = 48; // ~3rem total from original
    const offsetX = 12; // a touch to the right
    const sureOffset = 70 + offsetY;
    const thinkOffset = 145 + offsetY;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSurePos({
          x: centerX - s.width / 2 + offsetX,
          y: centerY - s.height / 2 + sureOffset,
        });
        setThinkPos({
          x: centerX - t.width / 2 + offsetX,
          y: centerY - t.height / 2 + thinkOffset,
        });
        setThinkClicks(0);
        setSureScale(1);
      });
    });
  }, [visible]);

  const handleThinkClick = useCallback(() => {
    setSureScale((s) => Math.min(2.2, s + 0.18));
    setThinkClicks((c) => {
      const next = c + 1;
      if (next >= 2) moveThink();
      return next;
    });
  }, [moveThink]);

  return (
    <div
      className={`${styles.questionScreen} ${
        visible ? styles.isVisible : styles.isHidden
      }`}
    >
      <div ref={arenaRef} className={styles.buttonArena}>
        <button
          ref={sureRef}
          type="button"
          className={`${styles.choiceBtn} ${styles.choiceYes}`}
          style={{
            ["--x" as any]: `${surePos.x}px`,
            ["--y" as any]: `${surePos.y}px`,
            ["--scale" as any]: sureScale,
          }}
          onClick={() => {
            if (armed) onSure();
          }}
        >
          100% SIGUR
        </button>

        <button
          ref={thinkRef}
          type="button"
          className={`${styles.choiceBtn} ${styles.choiceNo} ${
            shakeThink ? styles.shake : ""
          }`}
          style={{
            ["--x" as any]: `${thinkPos.x}px`,
            ["--y" as any]: `${thinkPos.y}px`,
          }}
          onMouseEnter={() => {
            if (thinkClicks >= 2) moveThink();
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            if (thinkClicks >= 2) moveThink();
          }}
          onClick={handleThinkClick}
          onFocus={() => {
            if (thinkClicks >= 2) moveThink();
          }}
        >
          ma gandesc...
        </button>
      </div>
    </div>
  );
}

export default memo(ValentineQ2);
