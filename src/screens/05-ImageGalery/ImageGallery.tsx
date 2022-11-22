import React, { ChangeEvent, TransitionEventHandler, useState } from 'react';
import styles from './ImageGalery.module.css';
import cx from 'classnames';

const panels = [
  { top: 'Hey', mid: `Let's`, bottom: 'Dance' },
  { top: 'Give', mid: 'Take', bottom: 'Receive' },
  { top: 'Experience', mid: 'It', bottom: 'Today' },
  { top: 'Give', mid: 'All', bottom: 'You can' },
  { top: 'Life', mid: 'In', bottom: 'Motion' },
];

export const ImageGallery = () => {
  const [transitionedPanel, setTransitionedPanel] = useState<string | undefined>(undefined);
  const [activePanel, setActivePanel] = useState<string | undefined>(undefined);

  const onTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName === 'flex-grow') {
      setTransitionedPanel(activePanel);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.panels)}>
        {panels.map((panel, key) => {
          const panelName = `panel${key + 1}`;
          return (
            <div
              onClick={() => setActivePanel(panelName)}
              onTransitionEnd={e => onTransitionEnd(e)}
              key={key}
              className={cx(
                styles.panel,
                styles[panelName],
                activePanel === panelName && styles.open,
                transitionedPanel === panelName && styles.openActive
              )}
            >
              <p>{panel.top}</p>
              <p>{panel.mid}</p>
              <p>{panel.bottom}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
