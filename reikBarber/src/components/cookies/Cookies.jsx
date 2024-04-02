import React from "react";
import './Cookies.css';

const Cookies = () => {
  return (
    <div>
      <header>
        <h1>Políticas de Cookies y Privacidad</h1>
      </header>
      <main>
        <section>
          <h2>Política de Cookies</h2>
          <p>
            Este sitio web utiliza cookies para mejorar la experiencia del
            usuario. Al utilizar este sitio web, aceptas el uso de cookies de
            acuerdo con nuestra{" "}
            <a href="#politicaprivacidad">Política de Privacidad</a>.
          </p>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            ordenador o dispositivo móvil cuando visitas nuestro sitio web. Las
            cookies permiten que el sitio web recuerde tus acciones y
            preferencias (como inicio de sesión, idioma, tamaño de fuente y
            otras preferencias de visualización) durante un período de tiempo,
            para que no tengas que volver a introducirlas cada vez que vuelvas
            al sitio o navegar de una página a otra.
          </p>
          <p>
            Puedes controlar y/o eliminar las cookies según desees. Para obtener
            más información, consulta{" "}
            <a href="https://www.aboutcookies.org/">aboutcookies.org</a>.
          </p>
        </section>

        <section id="politicaprivacidad">
          <h2>Política de Privacidad</h2>
          <p>
            En nuestra política de privacidad explicamos cómo recopilamos,
            usamos y protegemos tu información cuando visitas nuestro sitio web
            y cómo protegemos tu privacidad.
          </p>
          <h3>Recopilación y Uso de la Información</h3>
          <p>
            Recopilamos varios tipos de información para diversos fines con el
            fin de proporcionar y mejorar nuestros servicios.
          </p>
          <h3>Seguridad</h3>
          <p>
            La seguridad de tu información personal es importante para nosotros,
            pero recuerda que ningún método de transmisión por Internet, o
            método de almacenamiento electrónico, es 100% seguro. Si bien
            nos esforzamos por utilizar medios comercialmente aceptables para
            proteger tu información personal, no podemos garantizar su
            absoluta seguridad.
          </p>
          <h3>Cookies</h3>
          <p>
            Como se mencionó anteriormente, utilizamos cookies para recopilar
            información. Puedes indicar a tu navegador que rechace todas las
            cookies o que indique cuándo se está enviando una cookie. Sin
            embargo, si no aceptas cookies, es posible que no puedas usar
            algunas partes de nuestro Servicio.
          </p>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Reik Barber. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Cookies;
