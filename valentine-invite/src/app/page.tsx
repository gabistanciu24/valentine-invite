"use client";

import { useMemo, useState } from "react";
import LiquidChrome from "./components/Liquidchrome/LiquidChrome";
import HeartParticles from "./components/HeartParticles";
import SplitText from "./components/SplitText/SplitText";
import NameScreen from "./components/NameScreen";
import ValentineQ1 from "./components/ValentineQ1";
import ValentineQ2 from "./components/ValentineQ2";
import FinalScreen from "./components/FinalScreen";
import LoveLetter from "./components/LoveLetter";
import styles from "./page.module.css";

type Stage = "letter" | "play" | "name" | "q1" | "q2" | "final";

export default function Home() {
  const [stage, setStage] = useState<Stage>("letter");
  const [acceptedName, setAcceptedName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [gifMode, setGifMode] = useState<"cute" | "angry">("cute");

  const baseColor = useMemo<[number, number, number]>(
    () => [0.1, 0.1, 0.1],
    [],
  );

  const CUTE_GIF_URL =
    "https://media1.tenor.com/m/E4auL-XxaaYAAAAd/floreyonce-cat.gif";
  const ANGRY_GIF_URL =
    "https://media1.tenor.com/m/fW6KOfqgqSQAAAAd/amma-cat-ts-js-pmo-icl.gif";

  const gifUrl = useMemo(
    () => (gifMode === "cute" ? CUTE_GIF_URL : ANGRY_GIF_URL),
    [gifMode],
  );

  function handleNameSubmit(value: string) {
    const raw = value.trim();
    const n = raw.toLowerCase();

    const ok = ["millie", "mili", "milaana"];
    const bea = ["bea", "beatrice"];

    if (!raw) {
      setGifMode("angry");
      setNameError("Scrie numele, nu mă lăsa în aer.");
      return;
    }

    if (ok.includes(n)) {
      setGifMode("cute");
      setNameError(null);
      setAcceptedName(raw);
      setStage("q1");
      return;
    }

    if (bea.includes(n)) {
      setGifMode("cute");
      setNameError(
        "Știu că și mama și prietena ta sunt prințese... dar îmi trebuie ACEA prințesă.",
      );
      return;
    }

    if (n === "flavius") {
      setGifMode("angry");
      setNameError("Am spus prințesă, nu prinț :))");
      return;
    }

    setGifMode("angry");
    setNameError("Am spus nume de prințesă, nu răpănoase.");
  }

  return (
    <main className={styles.stage}>
      <div className={styles.bg}>
        <LiquidChrome
          baseColor={baseColor}
          speed={0.15}
          amplitude={0.55}
          interactive={false}
        />
      </div>

      <div className={styles.particles}>
        <HeartParticles />
      </div>

      <LoveLetter
        visible={stage === "letter"}
        onStart={() => {
          setStage("play");
          setGifMode("cute");
          setNameError(null);
        }}
      />

      <div className={styles.heroFrame} data-hero-frame>
        <span className={`${styles.cornerHeart} ${styles.cornerHeartTL}`} />
        <span className={`${styles.cornerHeart} ${styles.cornerHeartBR}`} />

        <div className={styles.centerStack}>
          <div className={styles.tenorWrap}>
            <img
              className={styles.heroGif}
              src={gifUrl}
              alt={gifMode === "cute" ? "Cute cat gif" : "Angry cat gif"}
              loading="eager"
              draggable={false}
            />
          </div>

          <SplitText
            text={
              nameError ??
              (stage === "final"
                ? "Confirmare?"
                : stage === "q2"
                  ? "Sigur sigur?"
                  : stage === "q1"
                    ? "Will you be my Valentine?"
                    : "Ce spui de o felicitare de V-Day my way? :)")
            }
            className={`${styles.splitText} ${
              nameError ? styles.splitTextError : ""
            }`}
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />

          <div className={styles.actionSlot}>
            <button
              type="button"
              className={`${styles.btn} ${
                stage === "play" ? styles.isVisible : styles.isHidden
              }`}
              onClick={() => {
                setStage("name");
                setNameError(null);
                setGifMode("cute");
              }}
            >
              <strong className={styles.label}>Doresc</strong>

              <div className={styles.containerStars}>
                <div className={styles.stars}></div>
              </div>

              <div className={styles.glow}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
              </div>
            </button>

            <NameScreen
              visible={stage === "name"}
              onSubmit={handleNameSubmit}
              onTyping={() => {
                setNameError(null);
                setGifMode("cute");
              }}
            />

            <FinalScreen
              visible={stage === "final"}
              acceptedName={acceptedName}
            />
          </div>

          <button
            type="button"
            className={styles.miniReset}
            onClick={() => {
              setStage("letter");
              setAcceptedName("");
              setGifMode("cute");
              setNameError(null);
            }}
          >
            reset
          </button>
        </div>
      </div>

      <ValentineQ1 visible={stage === "q1"} onYes={() => setStage("q2")} />

      <ValentineQ2 visible={stage === "q2"} onSure={() => setStage("final")} />
    </main>
  );
}
