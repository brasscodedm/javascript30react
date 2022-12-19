import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import cx from 'classnames';

export const JsAndCssClock = () => {
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0, isReady: false });

  const startTime = () => {
    const now = new Date();

    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hour = now.getHours();

    setTime({
      seconds: (seconds / 60) * 360 + 90,
      minutes: (mins / 60) * 360 + (seconds / 60) * 6 + 90,
      hours: (hour / 12) * 360 + (mins / 60) * 30 + 90,
      isReady: true,
    });
  };

  useEffect(() => {
    const interval = setInterval(startTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.clock}>
        {time.isReady && (
          <div className={styles.clockFace}>
            <div
              className={cx(styles.hand, styles.hourHand)}
              style={{ transform: `rotate(${time.hours}deg` }}
            />
            <div
              className={cx(styles.hand, styles.minHand)}
              style={{ transform: `rotate(${time.minutes}deg` }}
            />
            <div
              className={cx(styles.hand, styles.secondHand)}
              style={{ transform: `rotate(${time.seconds}deg` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
