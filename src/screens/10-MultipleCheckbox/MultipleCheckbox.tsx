import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

interface Input {
  id: number;
  label: string;
  isChecked: boolean;
}

const initItems: Input[] = [
  {
    id: 1,
    label: 'This is an inbox layout.',
    isChecked: false,
  },
  { id: 2, label: 'Check one item', isChecked: false },
  { id: 3, label: 'Hold down your Shift key', isChecked: false },
  {
    id: 4,
    label: 'Check a lower item',
    isChecked: false,
  },
  {
    id: 5,
    label: 'Everything in between should also be set to checked',
    isChecked: false,
  },
  {
    id: 6,
    label: 'Try to do it without any libraries',
    isChecked: false,
  },
  {
    id: 7,
    label: 'Just regular JavaScript',
    isChecked: false,
  },
  {
    id: 8,
    label: 'Good Luck!',
    isChecked: false,
  },
  {
    id: 9,
    label: "Don't forget to tweet your result!",
    isChecked: false,
  },
];

export const MultipleCheckbox = () => {
  const [items, setItems] = useState(initItems);
  const [shiftOn, setShiftOn] = useState(false);
  const [lastCheckedId, setLastCheckedId] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = () => {
      setShiftOn(true);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyUp = () => {
      setShiftOn(false);
    };
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    console.log(shiftOn);
  }, [shiftOn]);

  const handleInputClick = (id: number) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }

      if (!shiftOn || !lastCheckedId) {
        return item;
      }

      if ((item.id > lastCheckedId && item.id < id) || (item.id < lastCheckedId && item.id > id)) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }

      return item;
    });

    setLastCheckedId(id);
    setItems(updatedItems);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inbox}>
        {items.map(({ id, isChecked, label }: Input) => (
          <div key={id} className={styles.item}>
            <input
              checked={isChecked}
              onClick={() => handleInputClick(id)}
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
