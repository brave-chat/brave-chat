import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Picker from 'emoji-picker-react';
import PropTypes from 'prop-types';

const EmojiPicker = ({ onPickEmoji }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    onPickEmoji(emojiObject.emoji);
    setShowEmoji(!showEmoji);
  };

  return (
    <Box className="emoji-picker">
      <IconButton onClick={() => setShowEmoji(!showEmoji)}>
        <InsertEmoticonIcon />
      </IconButton>
      {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
    </Box>
  );
};

export default EmojiPicker;

EmojiPicker.prototype = {
  onPickEmoji: PropTypes.func,
};
