import '../../styles/GameBoard.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Dialog from './Dialog';
import winPatterns from '../../globals/winPatterns';
import comTurn from '../../globals/comTurn';
import { XOrO, TargetType, StateType } from '../../types/types';

type GameBoardProps = StateType & {
    updateMark: (target: TargetType, comIsPlaying?: boolean) => void
    clearBoard: () => void
    restart: () => void
}

function GameBoard(props: GameBoardProps) {

    const [xWinCount, setXWinCount] = useState(0);
    const [oWinCount, setOWinCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);
    const [dialogOpening, setDialogOpening] = useState(false);

     /* This state is an array containing 2 values.
     1st value: the mark that win. 2nd value: the win pattern */
     const [winner, setWinner] = useState<([XOrO | '', (typeof winPatterns[number]) | []])>();   

    const currMark = props.xTurn ? 'x' : 'o';

    const newGame = () => {
        props.clearBoard();
        setWinner(undefined);
        setDialogOpening(false);
    }

    const gameFinished = (winner: (XOrO | ''), winPattern: ([TargetType, TargetType, TargetType] | [])) => {  
        if (winner) {
            if (winner === 'x') {
                setXWinCount(prevState => prevState + 1)
            } else {
                setOWinCount(prevState => prevState + 1)
            }
        } else {
            setDrawCount(state => state + 1);
        }
        setWinner([winner, winPattern]);

        setTimeout(() => {
            setDialogOpening(true)
        }, 1000)
    }
    
    const checkWinner = (mark: XOrO) => {
        for (let i = 0; i < winPatterns.length; i++) {          
            if (winPatterns[i].every(a => props.marksOnBoard[a] === mark)) {
                gameFinished(mark, winPatterns[i])
                console.log('winner is ' + mark)
                return true;             /* Returned value will be used to determined if the game is finished */
            }
        }
        
        let key: TargetType
        for (key in props.marksOnBoard) {    /* check if there's still an empty target */
            if (props.marksOnBoard[key] === '') {
                return false;
            }
        }
        gameFinished('', []);
        console.log('it\'s a draw');
        return true
    }

    useEffect(() => {
        
        const lastMark = props.xTurn ? 'o' : 'x';
        const isGameFinished = checkWinner(lastMark);

        /* If game is finished, don't invoke comTurn()  */
        if (isGameFinished) {   
            return;
        }
        
        /* Computer's turn */
        if (props.playMode === '1-player' && currMark !== props.playerOneMark) {
            const comTarget = comTurn(props.marksOnBoard, props.playerOneMark);
            console.log(comTarget)
    
            setTimeout(() => {
                props.updateMark(comTarget, true)
            }, 1500)
        }

    }, [props.marksOnBoard]);


    return (
        <div className='GameBoard'>       

            <Header
                currMark={currMark}
                setDialogOpening={setDialogOpening}
            />

            <Body 
                playMode={props.playMode}
                playerOneMark={props.playerOneMark}
                marksOnBoard={props.marksOnBoard}
                updateMark={props.updateMark}
                currMark={currMark}
                winner={winner}
            />

            <Footer 
                playMode={props.playMode}
                playerOneMark={props.playerOneMark}
                xWinCount={xWinCount}
                oWinCount={oWinCount}
                drawCount={drawCount}
            />

            <Dialog 
                playMode={props.playMode}
                playerOneMark={props.playerOneMark}
                dialogOpening={dialogOpening} 
                setDialogOpening={setDialogOpening}
                winner={winner}
                newGame={newGame}
                restart={props.restart}
            />

        </div>
    )
}

export default GameBoard