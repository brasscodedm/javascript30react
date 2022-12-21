import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import cx from 'classnames';

const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'hugo', age: 8 },
];

export const DevTools = () => {
  const [isActive, setIsActive] = useState(false);
  const makeGreen = () => {
    setIsActive(true);
  };

  useEffect(() => {
    // Regular
    console.log('Siemka');

    // Interpolated
    const name = 'BRASSCODE';
    console.log('Hello, I am %s!', name);

    // Styled
    console.log(
      ' %cIt is %c styled debug log ',
      'font-size:50px; background:red; text-shadow: 10px 10px 0 blue',
      'font-size:20px; background:purple; text-shadow: 4px 4px 0 yellow'
    );

    // warning!
    console.warn('OH NOOO WARNING MODE!');

    // Error :|
    console.error('Error!');

    // Info
    console.info('Crocodiles eat 3-4 people per year');

    // Testing
    const p = document.querySelector('p');
    //
    p && console.assert(p.classList.contains('ouch'), 'That is wrong!');

    // clearing;
    // console.clear();
    //
    // Viewing DOM Elements
    // console.log(p);
    // console.dir(p);
    //
    // console.clear();

    // Grouping together
    dogs.forEach(dog => {
      console.groupCollapsed(`${dog.name}`);
      console.log(`This is ${dog.name}`);
      console.log(`${dog.name} is ${dog.age} years old`);
      console.log(`${dog.name} is ${dog.age * 7} dog years old`);
      console.groupEnd();
    });

    // counting

    console.count('Wes');
    console.count('Wes');
    console.count('Steve');
    console.count('Steve');
    console.count('Wes');
    console.count('Steve');
    console.count('Wes');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');

    // timing

    console.time('fetching data 1');
    fetch('https://api.github.com/users/wesbos')
      .then(data => data.json())
      .then(data => {
        console.timeEnd('fetching data 1');
        console.log(data);
      });

    //table
    console.table(dogs);
  }, []);
  return (
    <p onClick={makeGreen} className={cx(isActive && styles.active)}>
      ×BREAK×DOWN×
    </p>
  );
};
