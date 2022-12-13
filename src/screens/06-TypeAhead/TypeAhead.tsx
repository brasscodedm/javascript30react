import React, { FormEvent, useEffect, useState } from 'react';
import styles from './style.module.css';
const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

interface City {
  city: string;
  state: string;
  population: number;
}

const numbersWithDots = (data: number) => {
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const TypeAhead = () => {
  const [cites, setCities] = useState<City[]>([]);
  const [value, setValue] = useState<string | undefined>(undefined);

  const onChangeValue = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const renderEmpty = () => (
    <>
      <li>Filter for a city</li>
      <li>Or a state</li>
    </>
  );

  const renderElements = () => {
    if (!value) {
      return renderEmpty();
    }

    const regex = new RegExp(value, 'gi');
    const results = cites.filter(place => place.city.match(regex) || place.state.match(regex));

    if (results.length) {
      return results.map((place, key) => {
        const title = `${place.city}, ${place.state}`.replace(
          new RegExp(value, 'ig'),
          match => `<span class="${styles.hl}">${match}</span>`
        );

        return (
          <li key={key}>
            <span dangerouslySetInnerHTML={{ __html: title }} />
            <span className={styles.population}>{numbersWithDots(place.population)}</span>
          </li>
        );
      });
    }
  };

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json())
      .then(setCities);
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
