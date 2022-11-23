import React, { useState } from 'react';
import styles from './ImageGallery.module.css';
import cx from 'classnames';

interface Panel {
  top: string;
  mid: string;
  bottom: string;
}

const panels: Panel[] = [
  { top: 'Hey', mid: `Let's`, bottom: 'Dance' },
  { top: 'Give', mid: 'Take', bottom: 'Receive' },
  { top: 'Experience', mid: 'It', bottom: 'Today' },
  { top: 'Give', mid: 'All', bottom: 'You can' },
  { top: 'Life', mid: 'In', bottom: 'Motion' },
];

export const ImageGallery = () => {
  const [transitionedPanels, setTransitionedPanels] = useState<string[]>([]);
  const [activePanels, setActivePanels] = useState<string[]>([]);

  const handleClick = (panel: string) => {
    if (activePanels.includes(panel)) {
      setActivePanels(prevState => prevState.filter(p => p !== panel));
    } else {
      setActivePanels(prevState => [...prevState, panel]);
    }
  };

  const handleTransitionEnd = (panel: string) => {
    if (transitionedPanels.includes(panel)) {
      setTransitionedPanels(prevState => prevState.filter(p => p !== panel));
    } else {
      setTransitionedPanels(prevState => [...prevState, panel]);
    }
  };

  return (
    <div className={cx(styles.panels)}>
      {panels.map((panel, key) => {
        const panelName = `panel${key + 1}`;
        return (
          <div
            onClick={() => handleClick(panelName)}
            onTransitionEnd={() => handleTransitionEnd(panelName)}
            key={key}
            className={cx(
              styles.panel,
              styles[panelName],
              activePanels.includes(panelName) && styles.open,
              transitionedPanels.includes(panelName) && styles.openActive
            )}
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
