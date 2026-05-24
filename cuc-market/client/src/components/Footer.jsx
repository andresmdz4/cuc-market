function Footer() {

  return (

    <footer className="
    mt-20
    bg-gradient-to-br
    from-[#c21722]
    via-[#98131b]
    to-[#5b0b10]
    text-white
    relative
    overflow-hidden
    ">

      {/* EFECTO ROJO */}
      <div className="
      absolute
      top-0
      right-0
      w-[400px]
      h-[400px]
      bg-[#ff4d5a]/20
      blur-3xl
      rounded-full
      " />

      {/* IMAGEN DECORATIVA */}
      <img
        src="/cv.png"
        alt="footer"
        className="
        absolute
        bottom-3
        right-5
        w-20
        md:w-20
        opacity-100
        pointer-events-none
        "
      />

      <div className="
      max-w-7xl
      mx-auto
      px-6
      py-14
      relative
      z-10
      ">

        {/* TOP */}
        <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-10
        ">

          {/* LEFT */}
          <div>

            <div className="
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            gap-4
            ">

              {/* LOGO MARKET */}
              <img
                src="/cuc-tp.png"
                alt="CUC"
                className="
                h-10
                sm:h-14
                object-contain
                max-w-full
                "
              />

              {/* LOGO CUC */}
              <img
                src="/cuc-market.png"
                alt="CUC"
                className="
                h-8
                sm:h-12
                object-contain
                max-w-full
                "
              />

            </div>

            <p className="
            text-white
            mt-5
            max-w-md
            leading-relaxed
            text-[15px]
            ">

              Plataforma enfocada en impulsar
              los emprendimientos estudiantiles
              dentro de la Universidad de la Costa.

            </p>

          </div>

          {/* LINKS */}
          <div className="
          flex
          gap-14
          ">

            {/* NAV */}
            <div>

              <h3 className="
              font-bold
              mb-4
              text-white
              text-lg
              ">

                Navegación

              </h3>

              <div className="
              flex
              flex-col
              gap-3
              text-white/80
              ">

                <a
                  href="/"
                  className="
                  hover:text-white
                  transition
                  "
                >

                  Inicio

                </a>

                <a
                  href="/products"
                  className="
                  hover:text-white
                  transition
                  "
                >

                  Productos

                </a>

                <a
                  href="/login"
                  className="
                  hover:text-white
                  transition
                  "
                >

                  Iniciar sesión

                </a>

              </div>

            </div>

            {/* CONTACT */}
            <div>

              <h3 className="
              font-bold
              mb-4
              text-white
              text-lg
              ">

                Contacto

              </h3>

              <div className="
              flex
              flex-col
              gap-3
              text-white/80
              ">

                <a
                  href="#"
                  className="
                  hover:text-white
                  transition
                  "
                >

                  Instagram

                </a>

                <a
                  href="#"
                  className="
                  hover:text-white
                  transition
                  "
                >

                  WhatsApp

                </a>

              </div>

            </div>

          </div>

        </div>

        {/* LINE */}
        <div className="
        border-t
        border-[#FCD116]
        mt-10
        pt-6
        text-white/70
        text-sm
        space-y-2
        ">

          <p>

            © 2026 CUC Market.
            Todos los derechos reservados.

          </p>

          <p className="
          text-[#FCD116]
          text-xs
          ">

            Proyecto académico desarrollado por
            Camilo Velandia —
            Ingeniería de Sistemas.

          </p>

        </div>

      </div>

    </footer>

  )

}

export default Footer