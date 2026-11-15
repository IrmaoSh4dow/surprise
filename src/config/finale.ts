/** Texto exacto del desenlace. No añade la pregunta ni una respuesta. */
export const finaleText = `Mi niña, hemos llegado al final de este pequeño recorrido, pero no al final de nuestra historia.

Si algo he aprendido desde que llegaste a mi vida, es que no necesito conocer todos los caminos que nos esperan para saber con quién quiero recorrerlos.

Quiero seguir construyendo contigo. Quiero nuestros días buenos, nuestros días difíciles, nuestras pequeñas aventuras, nuestros sueños y ese hogar que tantas veces hemos imaginado.

Y aunque hoy te he llevado por diferentes lugares, todavía hay uno al que quiero llevarte.

Hay un último lugar especial al que quiero llevarte, mi amor. Un lugar donde tengo algo muy importante que decirte y, sobre todo, una pregunta que llevo tiempo guardando en mi corazón.

Pero esa parte de nuestra historia quiero escribirla contigo, mirándote a los ojos.

Con todo mi amor,
Luke Price.`

export function finaleParts(text: string): { body: string[]; closing: string[] } {
  const parts = text.split("\n\n")
  const closing = parts.pop()?.split("\n") ?? []
  return { body: parts, closing }
}
