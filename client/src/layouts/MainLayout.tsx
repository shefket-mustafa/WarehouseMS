import type { ReactNode } from "react"
import Navbar from "../components/Navbar"
import Footer from "../pages/Footer"

type LayoutPropType ={
    children: ReactNode
}

export default function MainLayout ({children}: LayoutPropType){

    return (
        <>
        <Navbar />
        {children}
        <Footer />
        </>
    )


}