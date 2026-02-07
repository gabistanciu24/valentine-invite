"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { IOptions } from "tsparticles";

const HeartParticles = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setReady(true);
    });
  }, []);

  const options = useMemo<Partial<IOptions>>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: {
          value: 45,
          density: { enable: true, area: 900 },
        },
        opacity: { value: 0.9 },
        shape: {
          type: "image",
          options: {
            image: {
              src: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2030'%3E%3Cpath%20fill='%23ff6fb7'%20d='M23.6%200c-2.6%200-5%201.3-6.6%203.3C15.4%201.3%2013%200%2010.4%200%205.9%200%202.3%203.6%202.3%208.1c0%208.2%207.8%2013.1%2014.7%2021.1c6.9-8%2014.7-12.9%2014.7-21.1C31.7%203.6%2028.1%200%2023.6%200z'/%3E%3C/svg%3E",
              width: 32,
              height: 30,
            },
          },
        },
        size: { value: { min: 16, max: 34 } },
          move: {
            enable: true,
            speed: 1.2,
            direction: "bottom",
            outModes: { default: "out" },
          },
        shadow: {
          enable: true,
          color: "#ff7ab6",
          blur: 8,
          offset: { x: 0, y: 2 },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: false },
          resize: { enable: true },
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!ready) return null;

  return (
    <Particles
      id="heart-particles"
      className="heartParticles"
      style={{ width: "100%", height: "100%" }}
      options={options}
    />
  );
};

export default memo(HeartParticles);
