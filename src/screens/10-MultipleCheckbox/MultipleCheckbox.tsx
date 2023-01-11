import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

interface Input {
  label: string;
  isChecked: boolean;
}

const initItems: Input[] = [
  {
    label: 'This is an inbox layout.',
    isChecked: false,
  },
  { label: 'Check one item', isChecked: false },
  { label: 'Hold down your Shift key', isChecked: false },
  {
    label: 'Check a lower item',
    isChecked: false,
  },
  {
    label: 'Everything in between should also be set to checked',
    isChecked: false,
  },
  {
    label: 'Try to do it without any libraries',
    isChecked: false,
  },
  {
    label: 'Just regular JavaScript',
    isChecked: false,
  },
  {
    label: 'Good Luck!',
    isChecked: false,
  },
  {
    label: "Don't forget to tweet your result!",
    isChecked: false,
  },
];

export const MultipleCheckbox = () => {
  const [items, setItems] = useState(initItems);
  const [shiftOn, setShiftOn] = useState(false);
  const [lastCheckedKey, setLastCheckedKey] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = () => setShiftOn(true);
    const handleKeyUp = () => setShiftOn(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleInputClick = (key: number) => {
    const updatedItems = items.map(item => {
      const itemIndex = items.indexOf(item);

      if (itemIndex === key) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }

      if (!shiftOn || lastCheckedKey === null) {
        return item;
      }

      if (
        (itemIndex > lastCheckedKey && itemIndex < key) ||
        (itemIndex < lastCheckedKey && itemIndex > key)
      ) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }

      return item;
    });

    setLastCheckedKey(key);
    setItems(updatedItems);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inbox}>
        {items.map(({ isChecked, label }: Input, key) => (
          <div key={key} className={styles.item}>
            <input
              checked={isChecked}
              onClick={() => handleInputClick(key)}
              className={styles.input}
              type="checkbox"
            />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
