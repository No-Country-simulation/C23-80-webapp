const Card = ({ backgroundImage }) => {
  return(
    <div
      className="rounded-lg shadow-lg bg-cover bg-center aspect-video max-w-[504px] w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  )
}

export default Card;