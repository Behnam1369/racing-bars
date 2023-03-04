import React, { useState, useEffect, useMemo } from "react";
import style from "./RacingBars.module.css";
import PropTypes from "prop-types";
import Bar from "./Bar";

const RacingBars = (props) => {
  const {
    data,
    barHeight,
    title,
    value,
    time,
    color = "silver",
    topN,
    topNColor,
    lastN,
    lastNColor,
  } = props;
  const timePoints = useMemo(
    () => [...new Set(data.map((el) => el[time]))],
    [data, time]
  );
  const titles = useMemo(
    () => [...new Set(data.map((el) => el[title]))],
    [data, title]
  );
  const [playing, setPlaying] = useState(false);
  // const [timeIndex, setTimeIndex] = useState(-2);
  const [timeIndex, setTimeIndex] = useState(-2);
  const maxScore = useMemo(
    () => Math.max(...data.map((el) => el[value])),
    [data, value]
  );

  useEffect(() => {
    if (!playing) return;
    const timeout = setInterval(() => {
      console.log("timeout");
      setTimeIndex(
        timeIndex >= timePoints.length - 2
          ? timePoints.length - 2
          : timeIndex + 1
      );
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [timeIndex, playing, timePoints]);

  const handleNext = (e) => {
    e.preventDefault();
    setTimeIndex(timeIndex + 1);
  };

  const rank = (_title, _timeIndex) => {
    if (timeIndex < 0) return titles.sort((a, b) => a - b).indexOf(_title) + 1;
    return (
      data
        .filter((el) => el[time] == timePoints[_timeIndex])
        .findIndex((el) => el[title] == _title) + 1
    );
  };

  const point = (_title, _timeIndex) => {
    if (!timePoints.includes(timePoints[_timeIndex])) return 0;
    return data
      .filter((el) => el[time] == timePoints[_timeIndex])
      .find((el) => el[title] == _title)[value];
  };

  const togglePlay = (e) => {
    e.preventDefault();
    if (!playing) setTimeIndex(timeIndex + 1);
    setPlaying(!playing);
  };

  return (
    <div className={style.main}>
      <h3>Match Day {timePoints[timeIndex + 1]}</h3>
      <div className={style.chart}>
        {titles.map((title) => (
          <Bar
            key={title}
            className={style.bar}
            barHeight={barHeight}
            rankFrom={rank(title, timeIndex)}
            rankTo={rank(title, timeIndex + 1)}
            scoreFrom={point(title, timeIndex)}
            scoreTo={point(title, timeIndex + 1)}
            maxScore={maxScore}
            colorFrom={
              rank(title, timeIndex) <= topN
                ? topNColor
                : rank(title, timeIndex) > titles.length - lastN
                ? lastNColor
                : color
            }
            colorTo={
              rank(title, timeIndex + 1) <= topN
                ? topNColor
                : rank(title, timeIndex + 1) > titles.length - lastN
                ? lastNColor
                : color
            }
          >
            <div className={style.team}>{title}</div>
            <div className={style.progress}></div>
            <div className={style.score}>{point(title, timeIndex + 1)}</div>
          </Bar>
        ))}
      </div>
      <button onClick={(e) => handleNext(e)}>Next</button>
      <button onClick={(e) => togglePlay(e)}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
};

RacingBars.propTypes = {
  data: PropTypes.array.isRequired,
  barHeight: PropTypes.number,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

RacingBars.defaultProps = {
  barHeight: 30,
};

export default RacingBars;
