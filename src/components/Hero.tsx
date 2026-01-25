import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all"
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        const heroSplit = SplitText.create('.title', { type: "chars, words" });
        const paragraphSplit = SplitText.create('.subtitle', { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.05,
        })

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: 1.5, // Smoother scrubbing with slight delay
                pin: true
            }
        })

        const videoEl = videoRef.current;
        if (videoEl) {
            // use the correct event name and capture the element so TypeScript knows it's not null
            videoEl.onloadedmetadata = () => {
                tl.to(videoEl, {
                    currentTime: videoEl.duration,
                    ease: "none" // Linear easing for video scrubbing
                })
            }
        }
        

    }, [])
    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>
                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic</p>
                            <p className="subtitle">Sip the Spirit <br /> of Summer</p>
                        </div>
                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients, cerative flair, and timeless recipes - designed to delight your senses.
                            </p>
                            <a href="#cocktails">View Cocktail</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />


            </div>
        </>
    )
}

export default Hero
