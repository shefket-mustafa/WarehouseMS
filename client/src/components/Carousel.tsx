

import { useEffect, useRef, useState } from "react";

const PARTNERS = [
  { name: "https://www.bgnovini.eu/wp-content/uploads/2021/01/59D4C7CF-43D9-40AF-A9C9-BBB048A4326C.png" },
  { name: "https://yt3.googleusercontent.com/j3MKjGbUl89hEo_VnG2FJZ--vxbWFeUSksHPIs5CUv0ajhiUyDWDkYFjpyy_YYKZtjgOSIirL2A=s900-c-k-c0x00ffffff-no-rj" },
  { name: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Walmart_logo_%282025%3B_Stacked_alt%29.svg/1200px-Walmart_logo_%282025%3B_Stacked_alt%29.svg.png" },
  { name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksdF1_y9eh9R5yDGqTPN70PPPpkOBEHFhPw&s" },
  { name: "https://viasever.viapark.bg/wp-content/uploads/2020/03/Lidl_logo-350x350_c.jpg" },
  { name: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pepco_logo.svg" },
  { name: "https://www.magnum7.bg/wp-content/uploads/2013/11/kaufland.jpg" },
  { name: "https://www.eshopwedrop.bg/images/shops_logo/9NsY2DnVgrWcKsXeM2C5rw-Decathlon-01.jpg" },
];

export default function Carousel() {
  const partners = PARTNERS;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const speed = 40; // pixels per second 

  // wait for all images to load to avoid layout shifts
  useEffect(() => {
    let mounted = true;
    const imgs = partners.map((p) => {
      const img = new Image();
      img.src = p.name;
      return img;
    });

    Promise.all(imgs.map((img) =>
      new Promise((res) => {
        if (img.complete) return res(true);
        img.onload = img.onerror = () => res(true);
      })
    )).then(() => {
      if (mounted) setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, [partners]);

  // animation loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !ready) return;

    let trackWidth = track.scrollWidth / 2; // because content is duplicated

    const step = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = time;

      if (!isPaused) {
        positionRef.current += speed * dt;
        if (trackWidth > 0 && positionRef.current >= trackWidth) {
          positionRef.current -= trackWidth;
        }
        track.style.transform = `translateX(${-positionRef.current}px)`;
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    const handleResize = () => {
      // recalc width to stay in sync when viewport changes
      trackWidth = track.scrollWidth / 2;
      // clamp position so it stays within new width
      if (trackWidth > 0) positionRef.current = positionRef.current % trackWidth;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      lastTimeRef.current = null;
    };
  }, [ready, isPaused]);

  // pause on hover handlers
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onEnter = () => setIsPaused(true);
    const onLeave = () => setIsPaused(false);
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    return () => {
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-slate-900">
      <h2 className="text-center text-2xl font-semibold text-slate-200 mb-8">
        Trusted by Leading Partners
      </h2>

      <div className="overflow-hidden">
        <div ref={trackRef} className="partners-marquee" style={{ transform: "translateX(0)" }}>
          {/* duplicated content for seamless scrolling */}
          {[...partners, ...partners].map((partner, i) => (
            <img
              key={`partner-${i}`}
              src={partner.name}
              alt={`Partner logo ${i}`}
              className="h-24 w-48 object-contain shrink-0 opacity-90"
              loading="eager"
            />
          ))}
        </div>
      </div>
    </section>
  );
}