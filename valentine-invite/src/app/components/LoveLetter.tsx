"use client";

import { memo } from "react";
import styles from "../page.module.css";

type Props = {
  visible: boolean;
  onStart: () => void;
};

function LoveLetter({ visible, onStart }: Props) {
  return (
    <div
      className={`${styles.letterOverlay} ${
        visible ? styles.isVisible : styles.isHidden
      }`}
    >
      <div className={styles.letterCard}>
        <h2 className={styles.letterTitle}>Hello hello</h2>
        <p className={styles.letterText}>
          O invitație mică, stupidă, dar foarte drăguță.
          <br />
          <br />
          Îi dăm bătaie?
        </p>

        <button type="button" className={styles.submitBtn} onClick={onStart}>
          Yess
        </button>
      </div>
    </div>
  );
}

export default memo(LoveLetter);
