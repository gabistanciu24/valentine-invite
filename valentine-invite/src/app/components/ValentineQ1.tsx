"use client";

import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { randomPositionAvoiding, type XY } from "../utils/randomPosition";

type Props = {
  visible: boolean;
  onYes: () => void;
};

function ValentineQ1({ visible, onYes }: Props) {
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const yesRef = useRef<HTMLButtonElement | null>(null);
  const noRef = useRef<HTMLButtonElement | null>(null);
  const shakeTimerRef = useRef<number | null>(null);

  const [yesPos, setYesPos] = useState<XY>({ x: 0, y: 0 });
  const [noPos, setNoPos] = useState<XY>({ x: 0, y: 0 });
  const [shakeNo, setShakeNo] = useState(false);

  const moveNo = useCallback(() => {
    const arena = arenaRef.current;
    const yesBtn = yesRef.current;
    const noBtn = noRef.current;
    if (!arena || !yesBtn || !noBtn) return;

    const a = arena.getBoundingClientRect();
    const y = yesBtn.getBoundingClientRect();
    const n = noBtn.getBoundingClientRect();

    const avoid = {
      x: y.left - a.left,
      y: y.top - a.top,
      w: y.width,
      h: y.height,
    };

    const next = randomPositionAvoiding(
      { width: a.width, height: a.height },
      { width: n.width, height: n.height },
      avoid,
      12,
      60,
    );

    setNoPos(next);
    setShakeNo(true);
    if (shakeTimerRef.current) window.clearTimeout(shakeTimerRef.current);
    shakeTimerRef.current = window.setTimeout(() => setShakeNo(false), 220);
  }, []);

  useLayoutEffect(() => {
    if (!visible) return;
    const arena = arenaRef.current;
    const yesBtn = yesRef.current;
    const noBtn = noRef.current;
    if (!arena || !yesBtn || !noBtn) return;

    const a = arena.getBoundingClientRect();
    const hero = document.querySelector<HTMLElement>("[data-hero-frame]");
    const h = hero?.getBoundingClientRect();

    const centerX = (h ? h.left + h.width / 2 : a.left + a.width / 2) - a.left;
    const centerY = (h ? h.top + h.height / 2 : a.top + a.height / 2) - a.top;

    const y = yesBtn.getBoundingClientRect();
    const n = noBtn.getBoundingClientRect();

    const offsetY = 48; // ~3rem total from original
    const offsetX = 12; // a touch to the right
    const yesOffset = 70 + offsetY;
    const noOffset = 145 + offsetY;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setYesPos({
          x: centerX - y.width / 2 + offsetX,
          y: centerY - y.height / 2 + yesOffset,
        });
        setNoPos({
          x: centerX - n.width / 2 + offsetX,
          y: centerY - n.height / 2 + noOffset,
        });
      });
    });
  }, [visible]);

  return (
    <div
      className={`${styles.questionScreen} ${
        visible ? styles.isVisible : styles.isHidden
      }`}
    >
      <div ref={arenaRef} className={styles.buttonArena}>
        <button
          ref={yesRef}
          type="button"
          className={`${styles.choiceBtn} ${styles.choiceYes}`}
          style={{
            ["--x" as any]: `${yesPos.x}px`,
            ["--y" as any]: `${yesPos.y}px`,
          }}
          onClick={onYes}
        >
          YES
        </button>

        <button
          ref={noRef}
          type="button"
          className={`${styles.choiceBtn} ${styles.choiceNo} ${
            shakeNo ? styles.shake : ""
          }`}
          style={{
            ["--x" as any]: `${noPos.x}px`,
            ["--y" as any]: `${noPos.y}px`,
          }}
          onMouseEnter={moveNo}
          onPointerDown={(e) => {
            e.preventDefault();
            moveNo();
          }}
          onFocus={moveNo}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default memo(ValentineQ1);
