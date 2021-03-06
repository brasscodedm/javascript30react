import React from 'react';
import styles from './App.module.scss';
import { Link } from 'react-router-dom';

function App() {
	return (
		<div className={styles.root}>
			<nav className={styles.columns}>
				<Link className={styles.link} to={'/drumkit'}>
					01. Drumkit
				</Link>
			</nav>
		</div>
	);
}

export default App;
