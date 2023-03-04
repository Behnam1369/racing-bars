import React, { useRef, useEffect } from "react";

const Bar = ({
  barHeight,
  rankFrom,
  rankTo,
  scoreFrom,
  scoreTo,
  children,
  colorFrom,
  colorTo,
  maxScore,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const bar = ref.current;
      const duration = 1000; // milliseconds
      const fromTop = barHeight * rankFrom;
      const toTop = barHeight * rankTo;
      const parentWidth = bar.parentElement.offsetWidth - 50;
      console.log(parentWidth);
      const scoreWidth = (parentWidth - 330) / maxScore;
      console.log(scoreWidth);
      bar.style.position = "absolute";
      bar.style.marginLeft = "30px";
      bar.style.top = `${fromTop}px`;
      console.log(`${330 + scoreFrom * scoreWidth}px`);
      bar.style.width = `${330 + scoreFrom * scoreWidth}px`;
      bar.style.backgroundColor = colorFrom;
      bar.style.display = "grid";
      bar.style.gridTemplateColumns = "300px 1fr 30px";
      bar.style.transition = `
        top ${duration}ms linear,
        width ${duration}ms linear,
        background-color ${duration}ms linear
      `;
      setTimeout(() => {
        bar.style.top = `${toTop}px`;
        bar.style.width = `${330 + scoreTo * scoreWidth}px`;
        bar.style.backgroundColor = colorTo;
      }, 0);
    }
  }, [barHeight, rankFrom, rankTo, scoreFrom, scoreTo]);
  return <div ref={ref}>{children}</div>;
};

export default Bar;
