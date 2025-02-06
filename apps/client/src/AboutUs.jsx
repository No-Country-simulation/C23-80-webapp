const AboutUs = () => {
  const githubIcon = "https://res.cloudinary.com/dkwvnv9ey/image/upload/c_thumb,w_200,g_face/v1738805304/equipo-c23-80-webapp/users/25231_pcn8lh.png"
  const linkedinIcon = "https://res.cloudinary.com/dkwvnv9ey/image/upload/c_thumb,w_200,g_face/v1738805325/equipo-c23-80-webapp/users/61109_pcaq7r.png"
  const colaboradores = [
    {
      name: "Joel Dominguez",
      role: "Frontend developer",
      image: "https://res.cloudinary.com/dkwvnv9ey/image/upload/v1738250712/equipo-c23-80-webapp/users/qghde3oi1pawajal6zlk.jpg",
      socials: [
        {
          name: "LinkedIn",
          link: "#"
        },
        {
          name: "GitHub",
          link: "https://github.com/iJCode1"
        }
      ]
    },
    {
      name: "Paula Natalia Rubiano",
      role: "UX/UI Designer",
      image: "https://res.cloudinary.com/dkwvnv9ey/image/upload/v1738250610/equipo-c23-80-webapp/users/sfxq8qktasdyto4b1897.jpg",
      socials: [
        {
          name: "LinkedIn",
          link: "#",
        },
        {
          name: "GitHub",
          link: "#"
        }
      ]
    },
    {
      name: "Enoc Lima",
      role: "Backend developer",
      image: "https://res.cloudinary.com/dkwvnv9ey/image/upload/v1738250677/equipo-c23-80-webapp/users/kzarcuyujyxxy0zu88r8.jpg",
      socials: [
        {
          name: "LinkedIn",
          link: "#",
        },
        {
          name: "GitHub",
          link: "https://github.com/enokyw"
        }
      ]
    }
  ]
  return (
    <>
      <div className="flex flex-col items-center w-full mt-8">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6 bg-white space-y-6 md:space-y-0 gap-x-14 mb-14">
          <h2 style={{ color: "var(--purple)" }} className="text-4xl md:text-6xl lg:text-7xl font-bold">¿Quiénes somos?</h2>
          <p className="text-gray-700 text-xl">
            Somos un grupo de desarrolladores apasionados por la tecnología y la innovación. Nos unimos para crear una plataforma única: un repositorio centralizado de recursos diseñado para facilitar la vida de profesionales y entusiastas del desarrollo de software.
          </p>
        </div>

        <div style={{ background: "var(--grey50)" }} className="w-full mb-14">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row-reverse items-center justify-between py-16 px-6 space-y-6 md:space-y-0 gap-x-14">
            <h2 style={{ color: "var(--purple)" }} className="text-4xl md:text-6xl lg:text-7xl font-bold">¿Cómo funciona?</h2>
            <div className="space-y-6 md:w-1/2">
              <p className="text-gray-700 text-lg">
                Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, permitiéndote encontrar, compartir y organizar recursos de desarrollo de software de manera eficiente.
              </p>
              <p className="text-gray-700 text-lg">
                También ofrecemos repositorios específicos para distintos tipos de proyectos, como e-commerce, ERP y más. Nuestra plataforma permite a los usuarios registrarse y contribuir con nuevos repositorios, enriqueciendo así la comunidad.
              </p>
              <p className="text-gray-700 text-lg">
                Además, contamos con un potente campo de búsqueda que permite filtrar recursos específicos de manera eficiente, facilitando la localización de información relevante.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full max-w-[1200px] mx-auto items-center justify-center py-16 px-14 bg-white mb-14">
          <h2 style={{ color: "var(--purple)" }} className="text-4xl md:text-6xl lg:text-7xl font-bold">
            Conoce a nuestro equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center">
            {colaboradores.map((colaborador) => (
              <div key={colaborador.name} className="flex flex-col items-center space-y-1">
                <img src={colaborador.image} alt="Team member" className="w-32 h-32 rounded-full object-cover shadow-lg mb-4" />
                <h3 className="text-lg font-semibold">{colaborador.name}</h3>
                <p className="text-gray-700">{colaborador.role}</p>
                <div className="flex">
                  {colaborador.socials.map((social, index) => (
                    <a key={social.name} href={social.link} target="_blank" rel="noreferrer" className="flex p-1.5 rounded-full overflow-hidden">
                      <img src={social.name === "LinkedIn" ? linkedinIcon : githubIcon} alt={social.name} className="size-10" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs;