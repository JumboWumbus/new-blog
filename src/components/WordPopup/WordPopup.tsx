import { useState } from 'react';
import { usePopper } from 'react-popper';

import s from './WordPopup.module.scss'; // Import the SCSS module

interface WordDefinitionProps {
  word: string;
  definition: string;
}

const WordPopup: React.FC<WordDefinitionProps> = ({ word, definition }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLSpanElement | null>(null);
  const [popupElement, setPopupElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(triggerElement, popupElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8], // Adjust the offset as needed
        },
      },
    ],
  });

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <span
      className={s.word}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={setTriggerElement}
      role="button" // Indicate that the word is interactive
      aria-expanded={showPopup ? 'true' : 'false'} // Reflect the state of the popup
      aria-haspopup="true" // Indicate that a popup is associated with the word
    >
      {word}
      {showPopup && (
        <div
          ref={setPopupElement}
          className={s.popper}
          style={styles.popper}
          {...attributes.popper}
          role="tooltip" // Indicate that the popup is a tooltip
        >
          <div>{definition}</div>
        </div>
      )}
    </span>
  );
};

export default WordPopup;
