import styles from "./Envelope.module.css"

export default function Envelope() {
  return (
    <div className={styles.scene}>
      <svg className={styles.svg} viewBox="0 0 280 190" aria-hidden="true">
        <defs>
          <radialGradient id="envelope-wax" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f4e4ba" />
            <stop offset="46%" stopColor="#c7a46a" />
            <stop offset="100%" stopColor="#8b673c" />
          </radialGradient>
        </defs>
        <rect className={styles.body} x="16" y="32" width="248" height="142" rx="6" fill="#f6ecdf" />
        <g className={styles.letter}>
          <rect x="38" y="44" width="204" height="116" rx="2" fill="#fffaf4" />
          <path d="M56 74h86M56 92h128M56 110h64" stroke="#e6d5c3" strokeWidth="1.6" />
        </g>
        <path className={styles.pocket} d="M16 174 L140 98 L264 174 Z" fill="#e7d3be" />
        <path className={styles.flap} d="M16 32 L264 32 L140 108 Z" fill="#743246" />
        <g className={styles.seal}>
          <circle cx="140" cy="82" r="23" fill="url(#envelope-wax)" />
          <circle cx="140" cy="82" r="16.5" fill="none" stroke="#541b2a" strokeOpacity="0.28" />
          <text x="140" y="90" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fill="#541b2a">
            L
          </text>
        </g>
      </svg>
    </div>
  )
}
