"use client";

import { memo, useMemo } from "react";
import styles from "../page.module.css";

type Props = {
  visible: boolean;
  acceptedName: string;
};

function FinalScreen({ visible, acceptedName }: Props) {
  const message = useMemo(() => {
    const text = `Mulțumesc, ${acceptedName}! ` + `Ești minunată, te iubesc!`;
    return text;
  }, [acceptedName]);

  const whatsappHref = useMemo(() => {
    const encoded = encodeURIComponent("Da, accept. :)");
    return `https://wa.me/?text=${encoded}`;
  }, []);

  return (
    <div
      className={`${styles.finalScreen} ${
        visible ? styles.isVisible : styles.isHidden
      }`}
    >
      <h2 className={styles.finalTitle}>Mulțumeeeeesc!</h2>
      <p className={styles.finalText}>{message}</p>

      <a className={styles.whatsappBtn} href={whatsappHref} target="_blank">
        Confirmare pe WhatsApp
      </a>

      <p className={styles.finalHint}>Confirmă-mi te rog :).</p>
    </div>
  );
}

export default memo(FinalScreen);
