import React, { useState, useEffect, useMemo } from "react";
import style from "./RacingBars.module.css";
import PropTypes from "prop-types";
import Bar from "./Bar";
import * as htmlToImage from "html-to-image";

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
  const [timeIndex, setTimeIndex] = useState(-2);
  const maxScore = useMemo(
    () => Math.max(...data.map((el) => el[value])),
    [data, value]
  );

  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timeout = setInterval(() => {
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
  const handlePrev = (e) => {
    e.preventDefault();
    setTimeIndex(timeIndex - 1);
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

  const handleReset = (e) => {
    e.preventDefault();
    setTimeIndex(-2);
    setPlaying(false);
  };

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const handleRecord = () => {
    if (!recording) {
      setPlaying(true);
      startRecording();
    } else {
      setPlaying(false);
      stopRecording();
    }
  };

  const handleScreenshot = () => {
    htmlToImage
      .toJpeg(document.getElementById("racing-bars"), { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "screenshot1.jpeg";
        link.href = dataUrl;
        // console.log(link.href);
        link.click();
      });
  };

  return (
    <div className={style.main}>
      <h3>Match Day {timePoints[timeIndex + 1]}</h3>

      <div
        id="racing-bars"
        className={style.chart}
        style={{ height: barHeight * titles.length + 15 + "px" }}
      >
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

      <button onClick={(e) => handlePrev(e)}>Prev</button>
      <button onClick={(e) => handleNext(e)}>Next</button>
      <button onClick={(e) => togglePlay(e)}>
        {playing ? "Pause" : "Play"}
      </button>
      <button onClick={(e) => handleReset(e)}>Reset</button>
      {/* <button onClick={(e) => handleRecord(e)}>
        {recording ? "Stop" : "Record MP4"}
      </button> */}
      <button onClick={(e) => handleScreenshot(e)}>Screenshot</button>
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
