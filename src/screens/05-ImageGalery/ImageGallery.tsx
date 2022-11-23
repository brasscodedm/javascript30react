import React, { TransitionEvent, useState } from 'react';
import styles from './ImageGallery.module.css';
import cx from 'classnames';

interface Panel {
  top: string;
  mid: string;
  bottom: string;
  url: string;
}

const panels: Panel[] = [
  {
    top: 'Hey',
    mid: `Let's`,
    bottom: 'Dance',
    url: 'https://source.unsplash.com/gYl-UtwNg_I/1500x1500',
  },
  {
    top: 'Give',
    mid: 'Take',
    bottom: 'Receive',
    url: 'https://source.unsplash.com/rFKUFzjPYiQ/1500x1500',
  },
  {
    top: 'Experience',
    mid: 'It',
    bottom: 'Today',
    url: 'https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d',
  },
  {
    top: 'Give',
    mid: 'All',
    bottom: 'You can',
    url: 'https://source.unsplash.com/ITjiVXcwVng/1500x1500',
  },
  {
    top: 'Life',
    mid: 'In',
    bottom: 'Motion',
    url: 'https://source.unsplash.com/3MNzGlQM7qs/1500x1500',
  },
];

export const ImageGallery = () => {
  const [activePanels, setActivePanels] = useState<string[]>([]);

  const handleClick = (panel: string) => {
    if (activePanels.includes(panel)) {
      setActivePanels(prevState => prevState.filter(p => p !== panel));
    } else {
      setActivePanels(prevState => [...prevState, panel]);
    }
  };

  return (
    <div className={cx(styles.panels)}>
      {panels.map((panel, key) => {
        const panelName = `panel${key + 1}`;
        return (
          <div
            onClick={() => handleClick(panelName)}
            key={key}
            className={cx(
              styles.panel,
              styles[panelName],
              activePanels.includes(panelName) && styles.open
            )}
            style={{ backgroundImage: `url(${panel.url})` }}
          >
            <p>{panel.top}</p>
            <p>{panel.mid}</p>
            <p>{panel.bottom}</p>
          </div>
        );
      })}
    </div>
  );
};
