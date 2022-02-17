import React, { useCallback, useEffect, useState } from 'react';
import styles from './style.module.css';
import cx from 'classnames';

import clap from './sounds/clap.wav';
import hihat from './sounds/hihat.wav';
import kick from './sounds/kick.wav';
import openhat from './sounds/openhat.wav';
import boom from './sounds/boom.wav';
import ride from './sounds/ride.wav';
import snare from './sounds/snare.wav';
import tom from './sounds/tom.wav';
import tink from './sounds/tink.wav';

const keysMap = [
	{
		kdb: 'a',
		sound: 'clap',
		audio: new Audio(clap),
	},
	{
		kdb: 's',
		sound: 'hihat',
		audio: new Audio(hihat),
	},
	{
		kdb: 'd',
		sound: 'kick',
		audio: new Audio(kick),
	},
	{
		kdb: 'f',
		sound: 'openhat',
		audio: new Audio(openhat),
	},
	{
		kdb: 'g',
		sound: 'boom',
		audio: new Audio(boom),
	},
	{
		kdb: 'h',
		sound: 'ride',
		audio: new Audio(ride),
	},
	{
		kdb: 'j',
		sound: 'snare',
		audio: new Audio(snare),
	},
	{
		kdb: 'k',
		sound: 'tom',
		audio: new Audio(tom),
	},
	{
		kdb: 'l',
		sound: 'tink',
		audio: new Audio(tink),
	},
];

export const DrumKit = () => {
	const [playingKeys, setPlayingKeys] = useState<string[]>([]);

	const handleUserKeyPress = useCallback(({ key }) => {
		const currentKey = keysMap.find(element => element.kdb.toLowerCase() === key);

		if (currentKey) {
			currentKey.audio.currentTime = 0;
			currentKey.audio.play().then(() => setPlayingKeys(currentState => [...currentState, key]));
		}
	}, []);

	const onTransitionEnd = useCallback((key: string) => {
		setPlayingKeys(prevState => [...prevState.filter(el => el !== key)]);
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleUserKeyPress);
		return () => {
			window.removeEventListener('keydown', handleUserKeyPress);
		};
	}, [handleUserKeyPress]);

	return (
		<div className={styles.root}>
			<div className={styles.keys}>
				{keysMap.map(({ kdb, sound }) => (
					<div
						key={kdb}
						className={cx(styles.key, playingKeys.includes(kdb) && styles.playing)}
						onTransitionEnd={() => onTransitionEnd(kdb)}
					>
						<kbd>{kdb}</kbd>
						<span className={styles.sound}>{sound}</span>
					</div>
				))}
			</div>
		</div>
	);
};
