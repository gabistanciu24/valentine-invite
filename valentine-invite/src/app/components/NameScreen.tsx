"use client";

import { memo, useCallback, useState } from "react";
import styles from "../page.module.css";

type Props = {
  visible: boolean;
  onSubmit: (value: string) => void;
  onTyping?: () => void;
};

function NameScreen({ visible, onSubmit, onTyping }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    onSubmit(value);
  }, [onSubmit, value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <div
      className={`${styles.nameScreen} ${
        visible ? styles.isVisible : styles.isHidden
      }`}
    >
      <label className={styles.nameLabel} htmlFor="name-input">
        Un nume de prințesă te rog
      </label>

      <input
        id="name-input"
        className={styles.nameInput}
        type="text"
        placeholder="Numele"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onTyping?.();
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />

      <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
        Continuă
      </button>
    </div>
  );
}

export default memo(NameScreen);
