import styles from "./WelcomeScreen.module.css"

type WelcomeScreenProps = {
  started: boolean
  complete: boolean
  onBegin: () => void
}

export default function WelcomeScreen({ started, complete, onBegin }: WelcomeScreenProps) {
  const label = started ? "Continuar donde lo dejamos" : "Comenzar nuestra historia"
  const note = complete
    ? "El recorrido está completo. Mis últimas palabras te esperan."
    : "Guardé nuestro lugar en la historia."

  return (
    <section className="screen" data-screen="welcome">
      <div className={`frame ${styles.stack}`}>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <h1 className={styles.title}>Una historia escrita para ti</h1>
        <div className={styles.copy}>
          <p>
            Hay historias que no se escriben de una sola vez. Se construyen con pequeños momentos,
            lugares que guardan recuerdos y personas que hacen que todo tenga sentido.
          </p>
          <p>
            Esta es una pequeña aventura que preparé para ti. No necesitas saber hacia dónde vamos,
            solamente confiar en mí y dejarte sorprender.
          </p>
          <p className={styles.question}>¿Estás lista, mi amor?</p>
        </div>
        <p className={styles.signature}>Con amor, Luke.</p>
        {started && <p className={styles.note}>{note}</p>}
        <button className={`btn ${styles.begin}`} type="button" onClick={onBegin}>
          {label}
        </button>
      </div>
    </section>
  )
}
