import styles from "./Atmosphere.module.css"

const particles = [
  { left: "7%", top: "14%", delay: "0s", duration: "5.8s", size: 2 },
  { left: "16%", top: "68%", delay: "1.4s", duration: "6.6s", size: 3 },
  { left: "28%", top: "22%", delay: "0.6s", duration: "7.2s", size: 2 },
  { left: "42%", top: "80%", delay: "2.1s", duration: "5.4s", size: 2 },
  { left: "58%", top: "12%", delay: "1.1s", duration: "6.8s", size: 3 },
  { left: "73%", top: "34%", delay: "0.3s", duration: "7.4s", size: 2 },
  { left: "84%", top: "74%", delay: "1.8s", duration: "5.9s", size: 2 },
  { left: "91%", top: "18%", delay: "2.6s", duration: "6.2s", size: 3 },
  { left: "34%", top: "46%", delay: "1.6s", duration: "8s", size: 2 },
  { left: "63%", top: "58%", delay: "0.8s", duration: "6.5s", size: 2 },
  { left: "12%", top: "40%", delay: "2.4s", duration: "7s", size: 2 },
  { left: "78%", top: "88%", delay: "1.2s", duration: "5.6s", size: 2 },
]

function Sprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 180 260" fill="none" aria-hidden="true">
      <path
        d="M36 246C52 186 46 132 82 78C100 50 122 32 154 16"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M82 80C72 70 56 70 46 82C58 90 72 92 82 80Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M108 58C118 42 136 40 146 52C132 64 116 66 108 58Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M66 128C48 118 36 104 40 88C58 96 72 114 66 128Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M96 116C110 100 132 102 140 118C122 126 106 128 96 116Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M54 178C36 166 28 150 36 136C54 146 66 164 54 178Z"
        fill="currentColor"
        opacity="0.42"
      />
    </svg>
  )
}

type AtmosphereProps = {
  tone: "dusk" | "finale"
}

export default function Atmosphere({ tone }: AtmosphereProps) {
  return (
    <div className={`${styles.atmosphere} ${tone === "finale" ? styles.finale : styles.dusk}`} aria-hidden="true">
      <div className={styles.grain} />
      <div className={styles.vignette} />
      {tone === "finale" && <div className={styles.glow} />}
      {tone === "dusk" && (
        <>
          <Sprig className={styles.sprigRight} />
          <Sprig className={styles.sprigLeft} />
        </>
      )}
      <div className={styles.particles}>
        {particles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className={styles.particle}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>
    </div>
  )
}
