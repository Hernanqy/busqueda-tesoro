import { useEffect, useRef, useState } from "react";

type Screen =
  | "inicio"
  | "desafio"
  | "pista"
  | "final";

interface Desafio {
  numero: number;
  titulo: string;
  pregunta: string;
  imagen: string;
  audioDesafio: string;
  audioPista: string;
  pista: string;
  lugar: string;
}

const desafios: Desafio[] = [
  {
    numero: 1,
    titulo: "ADIVINANZA",
    pregunta:
      "Son pequeñas y duras, en el suelo descansan, algunas son de río, otras las encuentras en la casa. ¿Qué son?",
    imagen: "/assets/images/desafio-1.jpg",
    audioDesafio: "/assets/audio/desafio-1.mp3",
    audioPista: "/assets/audio/pista-1.mp3",
    pista: "FIJATE ATRÁS DEL SILLÓN",
    lugar: "COMEDOR",
  },
  {
    numero: 2,
    titulo: "ADIVINANZA",
    pregunta:
      "Suave y blanda soy, te acompaño al dormir, en mí descansas la cabeza para poder soñar y vivir. ¿Qué soy?",
    imagen: "/assets/images/desafio-2.jpg",
    audioDesafio: "/assets/audio/desafio-2.mp3",
    audioPista: "/assets/audio/pista-2.mp3",
    pista: "FIJATE EN LA ROPA COLGADA DE PAPÁ",
    lugar: "HABITACIÓN DE MAMÁ Y PAPÁ",
  },
  {
    numero: 3,
    titulo: "ADIVINANZA",
    pregunta:
      "Blancos o marrones, en la cocina me usan, me rompen, me baten, me cocinan y me disfrutan. ¿Qué soy?",
    imagen: "/assets/images/desafio-3.jpg",
    audioDesafio: "/assets/audio/desafio-3.mp3",
    audioPista: "/assets/audio/pista-3.mp3",
    pista: "FIJATE DONDE ESTÁN LAS OLLAS",
    lugar: "COCINA",
  },
  {
    numero: 4,
    titulo: "ADIVINANZA",
    pregunta:
      "Después de la ducha o de un buen baño, me usas para secarte y quedar en tu mejor estado. ¿Qué soy?",
    imagen: "/assets/images/desafio-4.jpg",
    audioDesafio: "/assets/audio/desafio-4.mp3",
    audioPista: "/assets/audio/pista-4.mp3",
    pista: "FIJATE ATRÁS DE LA ESTUFA ELÉCTRICA",
    lugar: "BAÑO",
  },
  {
    numero: 5,
    titulo: "ADIVINANZA",
    pregunta:
      "En un tablero soy rey, de estrategia y mente, blancas y negras me mueven para ganar inteligentemente. ¿Qué soy?",
    imagen: "/assets/images/desafio-5.jpg",
    audioDesafio: "/assets/audio/desafio-5.mp3",
    audioPista: "/assets/audio/pista-5.mp3",
    pista: "FIJATE ARRIBA DEL LAVARROPAS",
    lugar: "ESTUDIO",
  },
  {
    numero: 6,
    titulo: "ADIVINANZA",
    pregunta:
      "Bailo, canto y deslumbro, el Rey del Pop me llaman, con mis pasos y mi música, a todos los inspiro y encanto. ¿Quién soy?",
    imagen: "/assets/images/desafio-6.jpg",
    audioDesafio: "/assets/audio/desafio-6.mp3",
    audioPista: "/assets/audio/pista-6.mp3",
    pista: "FIJATE DEBAJO DE TU CAMA",
    lugar: "PIEZA DE BENJA",
  },
];

function App() {
  const [screen, setScreen] = useState<Screen>("inicio");
  const [desafioActual, setDesafioActual] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const desafio = desafios[desafioActual];

  const reproducirAudio = (src: string) => {
    if (!src) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    audio.play().catch(() => {
      console.log("El navegador requiere interacción para reproducir el audio.");
    });
  };

  useEffect(() => {
    if (screen === "inicio") {
      reproducirAudio("/assets/audio/inicio.mp3");
    }

    if (screen === "desafio") {
      reproducirAudio(desafio.audioDesafio);
    }

    if (screen === "pista") {
      reproducirAudio(desafio.audioPista);
    }

    if (screen === "final") {
      reproducirAudio("/assets/audio/final.mp3");
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [screen, desafioActual]);

  const iniciarBusqueda = () => {
    setDesafioActual(0);
    setScreen("desafio");
  };

  const mostrarPista = () => {
    setScreen("pista");
  };

  const siguienteDesafio = () => {
    if (desafioActual < desafios.length - 1) {
      setDesafioActual((actual) => actual + 1);
      setScreen("desafio");
    } else {
      setScreen("final");
    }
  };

  return (
    <main className="app">

      {screen === "inicio" && (
        <section className="pantalla inicio">

          <div className="decoracion decoracion-izq">🧭</div>
          <div className="decoracion decoracion-der">🗺️</div>

          <div className="inicio-contenido">
            <div className="brujula">🧭</div>

            <p className="pequeno">UNA GRAN AVENTURA ESTÁ POR COMENZAR</p>

            <h1>
              BÚSQUEDA
              <span>DEL TESORO</span>
            </h1>

            <p className="descripcion">
              Resuelve las adivinanzas, encuentra las pistas
              y descubre dónde se esconde el tesoro.
            </p>

            <button
              className="boton-principal"
              onClick={iniciarBusqueda}
            >
              INICIAR LA BÚSQUEDA
            </button>
          </div>

        </section>
      )}

      {screen === "desafio" && (
        <section className="pantalla desafio">

          <header className="cabecera">
            <div className="numero">
              {desafio.numero}
            </div>

            <div>
              <div className="etiqueta">
                DESAFÍO {desafio.numero} DE 6
              </div>

              <h1>{desafio.titulo}</h1>
            </div>
          </header>

          <div className="contenido-desafio">

            <div className="imagen-contenedor">
              <img
                src={desafio.imagen}
                alt={`Desafío ${desafio.numero}`}
                onError={(e) => {
                  e.currentTarget.src =
                    "/assets/images/desafio-generico.jpg";
                }}
              />
            </div>

            <div className="adivinanza">

              <div className="icono-pregunta">?</div>

              <p>
                {desafio.pregunta}
              </p>

              <div className="zona">
                RESUELVE LA ADIVINANZA
              </div>

              <button
                className="boton-secundario"
                onClick={mostrarPista}
              >
                YA LA RESOLVÍ →
              </button>

            </div>

          </div>

          <div className="progreso">
            {desafios.map((item, index) => (
              <div
                key={item.numero}
                className={
                  index <= desafioActual
                    ? "punto activo"
                    : "punto"
                }
              />
            ))}
          </div>

        </section>
      )}

      {screen === "pista" && (
        <section className="pantalla pista">

          <div className="pista-contenido">

            <div className="numero-pista">
              {desafio.numero}
            </div>

            <div className="etiqueta-pista">
              PISTA
            </div>

            <h1>
              ¿DÓNDE DEBO
              <span>BUSCAR?</span>
            </h1>

            <div className="pista-tarjeta">

              <div className="lupa">🔎</div>

              <p>
                {desafio.pista}
              </p>

              <small>
                ZONA: {desafio.lugar}
              </small>

            </div>

            <p className="mensaje">
              ¡Encontrá el lugar indicado y
              descubrí la siguiente pista!
            </p>

            <button
              className="boton-principal"
              onClick={siguienteDesafio}
            >
              {desafioActual === desafios.length - 1
                ? "ENCONTRÉ EL TESORO →"
                : "SIGUIENTE DESAFÍO →"}
            </button>

          </div>

        </section>
      )}

      {screen === "final" && (
        <section className="pantalla final">

          <div className="final-contenido">

            <div className="cofre">
              🏆
            </div>

            <p className="pequeno">
              ¡MISIÓN CUMPLIDA!
            </p>

            <h1>
              ¡TESORO
              <span>ENCONTRADO!</span>
            </h1>

            <p className="final-mensaje">
              Completaste las 6 pistas.
              <br />
              ¡Felicitaciones, gran explorador!
            </p>

            <div className="estrellas">
              ⭐ ⭐ ⭐
            </div>

            <button
              className="boton-principal"
              onClick={() => {
                setDesafioActual(0);
                setScreen("inicio");
              }}
            >
              VOLVER A EMPEZAR
            </button>

          </div>

        </section>
      )}

    </main>
  );
}

export default App;
