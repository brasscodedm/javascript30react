import React from 'react';
import styles from './App.module.scss';
import { Link } from 'react-router-dom';

class A {
	static void;
}

function App() {
	return (
		<div className={styles.root}>
			<Link to={'/drumkit'}>Drumkit</Link>
		</div>
	);
}

export default App;
