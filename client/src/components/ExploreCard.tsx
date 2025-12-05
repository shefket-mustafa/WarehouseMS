import { Link } from "react-router"

interface ExploreCardsProps{
    img: string,
    title: string,
    subtitle: string
}

export default function ExploreCard({img, title, subtitle}: ExploreCardsProps){

    return(
        <section className="flex flex-col justify-start w-1/3 gap-3">
            <img className="flex-1 object-center rounded-lg" src={img} alt="Explore img loading..." />
        <h1 className="text-amber-300">{title}</h1>
        <div className="flex">
        <h3>{subtitle}</h3>
        <Link className="bg-amber-300 self-center py-1 px-3 rounded-lg text-black hover:bg-amber-400 transition-colors" to="about">Explore</Link>
        </div>
        </section>
    )

}