import React from 'react';
import styles from './App.module.scss';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className={styles.root}>
      <nav className={styles.columns}>
        <Link className={styles.link} to={'/drumkit'}>
          <div>01. Drumkit</div>
        </Link>
      </nav>
    </div>
  );
};

export default App;
