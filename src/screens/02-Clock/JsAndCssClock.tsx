import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import cx from 'classnames';

export const JsAndCssClock = () => {
	const [secondsDegrees, setSecondsDegrees] = useState(0);
	const [minsDegrees, setMinsDegrees] = useState(0);
	const [hourDegrees, setHourDegrees] = useState(0);
	const [isReady, setIsReady] = useState(false);

	const intervalRef = useRef<NodeJS.Timeout>();

	const startTime = () => {
		const now = new Date();

		const seconds = now.getSeconds();
		const mins = now.getMinutes();
		const hour = now.getHours();

		setSecondsDegrees((seconds / 60) * 360 + 90);
		setMinsDegrees((mins / 60) * 360 + (seconds / 60) * 6 + 90);
		setHourDegrees((hour / 12) * 360 + (mins / 60) * 30 + 90);
		setIsReady(true);
	};

	const stopTime = intervalRef.current && clearInterval(intervalRef.current);

	useEffect(() => {
		setInterval(startTime, 1000);
		return stopTime;
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.clock}>
				{isReady && (
					<div className={styles.clockFace}>
						<div
							className={cx(styles.hand, styles.hourHand)}
							style={{ transform: `rotate(${hourDegrees}deg` }}
						/>
						<div
							className={cx(styles.hand, styles.minHand)}
							style={{ transform: `rotate(${minsDegrees}deg` }}
						/>
						<div
							className={cx(styles.hand, styles.secondHand)}
							style={{ transform: `rotate(${secondsDegrees}deg` }}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
