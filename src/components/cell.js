import React from 'react';
import { getClsNames } from '../utils/utils';
import { cellSize } from '../utils/constants';
import { gameStates } from '../utils/constants';
import ReactTouchEvents from 'react-touch-events';
import './cell.css';

function Cell(props) {
  const {
    isMine,
    mineCount,
    isRevealed,
    setIsRevealed,
    isFlagged,
    setIsFlagged,
    gameState,
    setGameState,
  } = props;
  const onClick = e => {
    e.preventDefault && e.preventDefault();
    if (!gameState && !isFlagged) {
      setIsRevealed();
      if (isMine) {
        setGameState(gameStates.lost);
      }
    }
  };

  const onRightClick = e => {
    e.preventDefault && e.preventDefault();
    setIsFlagged(!isFlagged);
  };

  let content,
    correct = false,
    incorrect = false,
    mineClass = {};

  if (isRevealed || gameState) {
    if (isMine) {
      content = '💣';
    } else {
      content = mineCount || '';
      mineClass[`m${mineCount}`] = true;
    }
    if (gameState) {
      correct = isFlagged && isMine;
      incorrect = isFlagged !== isMine;
    }
  } else {
    content = isFlagged ? '🚩' : '';
  }

  const classNames = getClsNames(
    { isRevealed, correct, incorrect, isFlagged, isMine, ...mineClass },
    'cell'
  );
  const style = { width: cellSize, height: cellSize };

  return (
    <ReactTouchEvents onTap={onClick} onSwipe={onRightClick}>
      <div
        className={classNames}
        style={style}
        onClick={onClick}
        onContextMenu={onRightClick}
        unselectable="on"
      >
        {content}
      </div>
    </ReactTouchEvents>
  );
}

export default Cell;
