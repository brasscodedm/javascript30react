import React, { ChangeEvent } from 'react';
import styles from './style.module.css';

export const CSSVariables = () => {
  const onUpdateProps = ({ target: { value, dataset, name } }: ChangeEvent<HTMLInputElement>) => {
    const finalValue = dataset.sizing ? value + dataset.sizing : value;
    document.documentElement.style.setProperty(`--${name}`, finalValue);
  };

  return (
    <div className={styles.wrapper}>
      <h2>
        Update CSS Variables with <span className={styles.hl}>JS</span>
      </h2>

      <div className={styles.controls}>
        <label htmlFor="spacing">Spacing:</label>
        <input
          id="spacing"
          type="range"
          name="spacing"
          min={10}
          max={200}
          defaultValue={0}
          data-sizing="px"
          onChange={onUpdateProps}
        />

        <label htmlFor="blur">Blur:</label>
        <input
          id="blur"
          type="range"
          name="blur"
          min={0}
          max={25}
          defaultValue={0}
          data-sizing="px"
          onChange={onUpdateProps}
        />

        <label htmlFor="base">Base Color</label>
        <input id="base" type="color" name="base" defaultValue="#ffc600" onChange={onUpdateProps} />
      </div>

      <img className={styles.image} src="https://source.unsplash.com/7bwQXzbF6KE/800x500" />
    </div>
  );
};
