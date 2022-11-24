import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import styles from './style.module.css';
const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

interface City {
  city: string;
  state: string;
}

export const TypeAhead = () => {
  const [cites, setCities] = useState<City[]>([]);
  const [value, setValue] = useState<string>('undefined');

  const onChangeValue = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const renderEmpty = () => (
    <>
      <li>Filter for a city</li>
      <li>or a state</li>
    </>
  );

  const renderElements = () => {
    const results = cites.filter(
      // show match method
      place => place.city.toLowerCase().includes(value) || place.state.toLowerCase().includes(value)
    );

    if (results.length) {
      return results.map((place, key) => <li key={key}>{place.city}</li>);
    }
    return renderEmpty();
  };

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setCities(data));
  }, []);

  return (
    <div className={styles.wrapper}>
      <form className={styles.searchForm}>
        <input
          onChange={onChangeValue}
          type="text"
          className={styles.search}
          placeholder="City or State"
        />
        <ul className={styles.suggestions}> {renderElements()}</ul>
      </form>
    </div>
  );
};
