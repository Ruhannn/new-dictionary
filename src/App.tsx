import { useEffect, useRef } from "react";
import Dictionary from "./Dictionary";

export default function App() {
  const loader = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const initialCurve = 200;
  const duration = 600;
  let start: number;

  useEffect(() => {
    setPath(initialCurve);
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);
  }, []);

  const animate = (timestamp: number) => {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const newCurve = easeOutQuad(elapsed, initialCurve, -200, duration);
    setPath(newCurve);
    if (loader.current) {
      loader.current.style.top =
        easeOutQuad(elapsed, 0, -loaderHeight(), duration) + "px";
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    }
  };

  const easeOutQuad = (
    time: number,
    start: number,
    end: number,
    duration: number
  ) => {
    return -end * (time /= duration) * (time - 2) + start;
  };

  const loaderHeight = () => {
    if (!loader.current) return 0;
    const loaderBounds = loader.current.getBoundingClientRect();
    return loaderBounds.height;
  };

  const setPath = (curve: number) => {
    const width = window.innerWidth;
    const height = loaderHeight();
    if (path.current) {
      path.current.setAttributeNS(
        null,
        "d",
        `M0 0
  L${width} 0
  L${width} ${height}
  Q${width / 2} ${height - curve} 0 ${height}
  L0 0`
      );
    }
  };
  return (
    <div className="min-h-screen relative">
      <div
        ref={loader}
        className="h-[calc(134vh-200px)] w-full fixed [&_svg]:size-full [&_svg_path]:stroke-black [&_svg_path]:[stroke-width:1px]">
        <svg>
          <path ref={path}></path>
        </svg>
      </div>
      <div>
        <Dictionary />
      </div>
    </div>
  );
}
