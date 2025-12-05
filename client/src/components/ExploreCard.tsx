import { Link } from "react-router"

interface ExploreCardsProps{
    img: string,
    title: string,
    subtitle: string
}

export default function ExploreCard({img, title, subtitle}: ExploreCardsProps){

    return(
        <section className="flex flex-col justify-start w-1/3 gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <img className="flex-1 object-cover w-full rounded-lg" src={img} alt="Explore img loading..." />
        <h1 className="text-amber-300 text-lg font-bold">{title}</h1>
        <div className="flex">
        <h3 className="text-sm flex-1">{subtitle}</h3>
        <Link className="bg-amber-300 self-start py-1 px-3 rounded-lg text-black hover:bg-amber-400 transition-colors" to="about">Explore</Link>
        </div>
        </section>
    )

}