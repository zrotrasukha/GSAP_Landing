import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <div className="h-dvh bg-black"/>
        </>
    )
}

export default App
