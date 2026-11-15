/**
 * Historia de Luke para Valentina.
 *
 * Cambia aquí los códigos, los lugares, las cartas y las fotos.
 * No hace falta modificar los componentes para editar la historia.
 *
 * - id: identificador estable. Si lo cambias, el progreso guardado de esa etapa se reinicia.
 * - order: posición en el recorrido. 1 es el primer lugar.
 * - chapter: nombre del capítulo, por ejemplo "Capítulo I".
 * - place: nombre del lugar. Solo se muestra cuando Valentina ya puede estar ahí.
 * - code: código físico. No distingue mayúsculas ni tildes. Los espacios y los guiones se ignoran.
 * - photo: ruta de la foto, dentro de public. Tamaño tipo Instax, en vertical.
 * - caption: la frase escrita bajo la foto.
 * - message: carta de Luke, en primera persona. Separa los párrafos con una línea en blanco.
 * - nextPlace / nextInstruction: destino que se revela al abrir esta carta.
 *   En la última etapa déjalos en null. Después de esa carta aparece el desenlace
 *   presencial. No escribas aquí la pregunta.
 *
 * El progreso vive en el navegador, en la clave "historia-valentina".
 */

export type Stage = {
  id: string
  order: number
  chapter: string
  place: string
  code: string
  photo: string
  caption: string
  message: string
  nextPlace: string | null
  nextInstruction: string | null
}

export const storyStages: Stage[] = [
  {
    id: "destino",
    order: 1,
    chapter: "Capítulo I",
    place: "Donde empezamos",
    code: "DESTINO",
    photo: "/fotos/destino.png",
    caption: "Tú y yo",
    message: `Valentina, si miro hacia atrás, todavía puedo recordar aquella primera vez que te vi. Quién iba a imaginar que aquella mujer con la que coincidí en el hospital terminaría convirtiéndose en la persona con la que hoy sueño compartir toda mi vida.

Todavía me hace sonreír pensar en aquel café que te invité. Quizás para ti fue solamente un café, pero para mí terminó siendo el comienzo de una historia que jamás habría querido perderme.

A veces pienso en todas las cosas que tuvieron que pasar para que nuestros caminos se cruzaran, y no puedo evitar sentirme afortunado. Porque entre tantas personas, tantos lugares y tantas posibilidades, tuve la dicha de encontrarte a ti.

Hoy, cuando te miro, no solamente veo a la mujer de la que estoy profundamente enamorado. También veo a la persona con la que quiero construir un hogar, cumplir nuestros sueños y descubrir todo lo que la vida todavía tiene preparado para nosotros.

Y ahora hay algo todavía más hermoso: ya no somos solamente tú y yo. Hay una pequeña vida creciendo en ti, una parte de nosotros que algún día podremos abrazar, cuidar y llenar de todo el amor que llevamos dentro.

Todavía no sabemos cómo será, a quién se parecerá o qué aventuras nos esperan, pero hay algo que sí tengo claro: quiero descubrir cada una de esas cosas a tu lado.

No sé si el destino estaba escrito, pero si aquella invitación a tomar un café fue el comienzo de todo esto, volvería a invitarte mil veces.

Porque, sin saberlo aquel día, estaba dando el primer paso hacia la familia que hoy tanto amo y que quiero cuidar por el resto de mi vida.`,
    nextPlace: "El tiempo que elijo",
    nextInstruction: "Te espero en el siguiente lugar. Allí hay otra carta para ti.",
  },
  {
    id: "eternidad",
    order: 2,
    chapter: "Capítulo II",
    place: "El tiempo que elijo",
    code: "ETERNIDAD",
    photo: "/fotos/eternidad.png",
    caption: "Contigo",
    message: `Valentina, hay algo que tengo muy claro: no quiero compartir contigo solamente los momentos extraordinarios de la vida. Quiero también todos esos días que parecen sencillos, pero que terminan siendo los más valiosos.

Quiero despertar a tu lado, escuchar tu voz incluso cuando todavía tengas sueño, compartir desayunos improvisados, reírnos por cualquier tontería y llegar al final del día sabiendo que, entre todas las cosas que pudieron pasar, tuve la fortuna de compartirlo contigo.

Quiero estar en tus días buenos, celebrar cada uno de tus logros y verte cumplir todo aquello con lo que sueñas. Pero también quiero estar cuando las cosas no salgan como esperábamos, cuando necesites un abrazo, cuando tengas miedo o simplemente cuando el mundo se sienta un poquito más pesado.

Porque amarte no significa querer solamente las partes bonitas de la vida. Significa querer vivirla entera contigo.

Y si me preguntaran qué es lo que más deseo de nuestro futuro, no sabría elegir una sola cosa. Quiero nuestras aventuras, nuestros viajes, nuestra casa llena de recuerdos, ver crecer a nuestra pequeña familia y tener la dicha de mirarte a los ojos después de muchos años y seguir encontrando en ti a la mujer de la que me enamoré.

No sé cuántos años nos regalará la vida, pero si hay algo que quiero hacer con cada uno de ellos, es seguir eligiéndote.

Porque no quiero una eternidad cualquiera. Quiero la mía, y quiero que sea contigo.`,
    nextPlace: "La casa que ya somos",
    nextInstruction: "Ven conmigo. En el siguiente lugar también hay algo que quiero decirte.",
  },
  {
    id: "hogar",
    order: 3,
    chapter: "Capítulo III",
    place: "La casa que ya somos",
    code: "HOGAR",
    photo: "/fotos/hogar.png",
    caption: "Nuestro hogar",
    message: `Valentina, durante mucho tiempo pensé que un hogar era simplemente un lugar al que regresar. Hoy entiendo que estaba equivocado, porque desde que llegaste a mi vida descubrí que un hogar también puede ser una persona.

Eres esa tranquilidad que encuentro después de un día largo, esa sonrisa que consigue cambiarme el ánimo y ese abrazo en el que quisiera quedarme un poquito más. Contigo puedo ser yo mismo, mostrar mis debilidades, compartir mis miedos y saber que no tengo que fingir ser fuerte todo el tiempo.

Y ahora, cuando pienso en nosotros, ya no puedo evitar imaginar todo lo que viene. Nuestra casa, las mañanas juntos, las risas llenando cada rincón, los pequeños desastres cotidianos y esa personita que algún día llenará nuestros días de nuevas aventuras.

Me ilusiona pensar en las cosas que todavía no conocemos: sus primeras palabras, sus pequeñas travesuras, los momentos en los que nos sorprenderemos mirándonos y pensando en lo afortunados que somos por tener esta familia.

No necesito que todo sea perfecto. No necesito una casa enorme ni una vida de película. Quiero un lugar donde nunca nos falten las ganas de volver a encontrarnos, donde nuestros sueños tengan espacio para crecer y donde siempre podamos sentirnos amados.

Porque si algo tengo claro, es que no estoy esperando encontrar un hogar en algún lugar del mundo.

Lo estoy construyendo contigo. Y no existe nada que me haga más feliz que saber que lo estamos construyendo los tres.`,
    nextPlace: "Los días que no pienso soltar",
    nextInstruction: "Te llevo un poco más adelante. No mires el mapa: mírame a mí.",
  },
  {
    id: "siempre",
    order: 4,
    chapter: "Capítulo IV",
    place: "Los días que no pienso soltar",
    code: "SIEMPRE",
    photo: "/fotos/siempre.png",
    caption: "Siempre",
    message: `Valentina, a veces pienso en lo curioso que es el amor. Uno puede conocer a muchísimas personas a lo largo de su vida, pero hay alguien que llega y, sin darse cuenta, termina convirtiéndose en esa persona con la que quiere compartirlo absolutamente todo.

Y tú eres esa persona para mí.

No quiero que lo nuestro sea solamente una historia bonita de recordar. Quiero que sea una historia que sigamos escribiendo durante muchos años. Quiero que tengamos tantas experiencias juntos que algún día nos cueste elegir cuál fue nuestra favorita. Quiero que nos sobren fotografías, anécdotas y motivos para sonreír cuando recordemos todo lo que hemos vivido.

Sé que la vida no siempre será sencilla. Habrá días en los que tendremos que aprender, tener paciencia, entendernos y recordar por qué comenzamos este camino. Pero no quiero que las dificultades nos hagan olvidar todo lo bonito que tenemos. Quiero que sigamos encontrando motivos para acercarnos, para cuidarnos y para elegirnos.

Quiero verte cumplir tus sueños, acompañarte en cada etapa y tener el privilegio de descubrir todas las versiones de ti que todavía no conozco. Porque estoy seguro de que seguiré enamorándome de ti de maneras que hoy ni siquiera imagino.

Y si algún día, después de muchísimos años, me preguntan cuál fue una de las decisiones más bonitas de mi vida, espero poder mirarte, tomar tu mano y decir que fue elegir caminar contigo.

No sé cómo se verá nuestro siempre, mi amor. Pero sé perfectamente con quién quiero vivirlo.`,
    nextPlace: "Lo que todavía no te digo",
    nextInstruction: "Queda un lugar. Quiero mostrártelo yo.",
  },
  {
    id: "senora-price",
    order: 5,
    chapter: "Capítulo V",
    place: "Lo que todavía no te digo",
    code: "SEÑORAPRICE",
    photo: "/fotos/senoraprice.png",
    caption: "Mis amores",
    message: `Valentina, hemos llegado al final de este pequeño recorrido, pero si algo quisiera que te llevaras de cada uno de estos lugares, es la certeza de lo inmensamente feliz que me hace tenerte en mi vida.

A veces me cuesta encontrar las palabras para explicarte todo lo que significas para mí. Cómo llegaste a cambiar tantos de mis días, cómo conseguiste convertirte en mi persona favorita y cómo, sin darme cuenta, comencé a imaginar cada uno de mis sueños contigo.

Hoy tengo mucho más que agradecerte que aquel primer café, aquella primera sonrisa o cada uno de los momentos que nos han traído hasta aquí. Te agradezco por lo que somos, por lo que estamos construyendo y por esa pequeña vida que crece en ti, que ya ocupa un lugar inmenso en nuestros corazones.

No sé si alguna vez voy a encontrar las palabras suficientes para explicarte lo que siento cuando pienso en nuestra familia, en todo lo que nos espera y en la suerte que tengo de poder vivir esta historia a tu lado.

Pero hay algo que llevo guardando para ti. Algo que no quiero escribir, ni resumir en una carta, ni dejar escondido detrás de una pantalla.

Quiero decírtelo mirándote a los ojos, tomándote de las manos y teniendo frente a mí a la mujer con la que quiero compartir el resto de mi vida.

Así que ven, mi amor. Nos espera un último lugar.

Y esta vez, quiero que me permitas hablarte desde lo más profundo de mi corazón.

Te amo, Valentina. A ti, a nuestra pequeña familia y a todo lo que todavía nos queda por vivir.`,
    nextPlace: null,
    nextInstruction: null,
  },
].sort((a, b) => a.order - b.order)
