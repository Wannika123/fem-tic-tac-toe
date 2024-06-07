import { useRef } from "react";
import xMark from '/assets/icon-x.svg';
import oMark from '/assets/icon-o.svg';
import { StateType, XOrO } from "../../types/types";
import winPatterns from "../../globals/winPatterns";

type DialogProps = {
    playMode: StateType['playMode']
    playerOneMark: StateType['playerOneMark']
    dialogOpening: boolean
    setDialogOpening: React.Dispatch<React.SetStateAction<boolean>>
    winner: [
        XOrO | '', 
        (typeof winPatterns[number]) | [],
    ] | undefined
    newGame: () => void
    restart: () => void
}

function Dialog({ playMode, playerOneMark, dialogOpening, setDialogOpening, winner, newGame, restart }: DialogProps) {

    const dialogRef = useRef<HTMLDialogElement>(null);

    if (dialogRef.current) {
        if (dialogOpening) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    } 
    
    /* The case when restart button is clicked (no winner yet) */
    if (!winner) {
        return (
            <dialog ref={dialogRef}>
                <div className="container">
                    <div className="main-text" style={{ color: '#a8bfc9' }}>restart game?</div>
                    <div className="btns-container">
                        <button className="silver-btn" onClick={() => { setDialogOpening(false) }}>no, cancel</button>
                        <button className="yellow-btn" onClick={restart}>yes, restart</button>
                    </div>
                </div>
            </dialog>
        )
    }
    
    let introText = '';
    if (winner[0]) {
        if (playMode === '1-player') {
            introText = winner[0] === playerOneMark ? 'you won!' : 'oh no, you lost...';
        } else {
            introText = winner[0] === playerOneMark ? 'player 1 wins!' : 'player 2 wins!';
        }
    }

    const mainTextStyle = winner[0] === 'x' ? '#31c3bd' : '#f2b137';

    return (
        <dialog ref={dialogRef}>

            <div className="container">

                { introText !== '' && <p>{introText}</p>}
    
                { winner[0] === '' 
                    ? <div className="main-text" style={{ color: '#a8bfc9' }}>round tied</div>
                    : (
                        <div className="main-text" style={{ color: mainTextStyle }}>
                            { winner[0] === 'x'
                                ? <img className="mark" src={xMark} alt="x" />
                                : <img className="mark" src={oMark} alt="o" />
                            }
                            takes the round
                        </div>
                    )
                }
    
                <div className="btns-container">
                    <button className="silver-btn" onClick={restart}>quit</button>
                    <button className="yellow-btn" onClick={newGame}>next round</button>
                </div>
    
            </div>

        </dialog>
    )
}

export default Dialog;