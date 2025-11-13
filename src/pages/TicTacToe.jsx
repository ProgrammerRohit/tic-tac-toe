import { useState } from "react";
import styles from "../styles/tic_tac_toe.module.css";
import cross from "../assets/cross.png";
import zero from "../assets/zero.png";

const TicTacToe = () => {
  const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);

  const [turn, setTurn] = useState("X");
  const allMoves = [...player1, ...player2];

  const [playerWin, setPlayerWin] = useState();

  const winningPattern = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const checkWin = (moves) => {
    return winningPattern.some((pattern) =>
      pattern.every((num) => moves.includes(num))
    );
  };

  const handleSlots = (val) => {
    if (turn == "X") {
      let update = [...player1, val];
      setPlayer1(update);

      if (checkWin(update)) {
        setPlayerWin("Player X Wins 🎉");
      }
      setTurn("O");
    } else {
      let update = [...player2, val];
      setPlayer2(update);

      if (checkWin(update)) {
        setPlayerWin("Player O Wins 🎉");
      }
      setTurn("X");
    }
  };

  return (
    <>
      <h1 className={styles.gameHeading}>Tic Tac Toe ✨</h1>
      <h2 className={styles.turnText}>{playerWin ? "" : `Turn: ${turn}`}</h2>
      <h1 className={styles.playerWin}>{playerWin}</h1>

      <div className={styles.wrapper}>
        {slots.map((item, index) => (
          <button
            key={index}
            disabled={allMoves.includes(item) || playerWin}
            onClick={() => handleSlots(item)}
            className={`${styles.slots} ${
              player1.includes(item) || player2.includes(item)
                ? styles.filled
                : ""
            }`}
          >
            {player1.includes(item) ? (
              <img src={cross} alt="X" className={styles.slotImage} />
            ) : player2.includes(item) ? (
              <img src={zero} alt="O" className={styles.slotImage} />
            ) : (
              ""
            )}
          </button>
        ))}
      </div>

      <div className={styles.resetGame}>
        <a href="/">RESET</a>
      </div>
    </>
  );
};

export default TicTacToe;