import { Link } from "react-router";

export default function Footer(){


    return(

        <main className="w-full h-40">

            <nav>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>

            </nav>

        </main>
    )
}
