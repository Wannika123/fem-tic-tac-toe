import xMark from '/assets/icon-x.svg';
import oMark from '/assets/icon-o.svg';
import xMarkOutline from '/assets/icon-x-outline.svg';
import oMarkOutline from '/assets/icon-o-outline.svg';
import { useState } from 'react';
import { StateType, TargetType, XOrO } from '../../types/types';
import winPatterns from '../../globals/winPatterns';

type BodyProps = {
    marksOnBoard: StateType['marksOnBoard']
    updateMark: (target: TargetType, comIsPlaying?: boolean) => void
    playMode: StateType['playMode']
    playerOneMark: StateType['playerOneMark']
    currMark: XOrO
    winner: [
        XOrO | '', 
        (typeof winPatterns[number]) | [],
    ] | undefined
}

function Body({ marksOnBoard, updateMark, playMode, playerOneMark, currMark, winner }: BodyProps) {

    /* An array containing the mark of each target boxes */
    const marksOnBoardArr = Object.values(marksOnBoard);

    let winPattern: string[] = [];
    if (winner) {
        winPattern = winner[1]
    }

    const boxStyles: React.CSSProperties = {
        backgroundColor: 'hsl(199, 35%, 19%)',
        boxShadow: '0 -6px 0 hsl(201, 34%, 11%) inset'
    }

    const xWinBoxStyles: React.CSSProperties = {
        backgroundColor: 'hsl(179, 60%, 48%)',
        boxShadow: '0 -6px 0 hsl(179, 51%, 43%) inset'
    }

    const oWinBoxStyles: React.CSSProperties = {
        backgroundColor: 'hsl(39, 88%, 58%)',
        boxShadow: '0 -6px 0 hsl(39, 45%, 49%) inset'
    }

    const handleClick = (index: number) => {
        const target = (index + 1).toString();
        if (target === '1' || target === '2' || target === '3' || target === '4' || target === '5' || target === '6' || target === '7' || target === '8' || target === '9') {
            updateMark(target)
        }
    }

    return (
        <div className='target-boxes'>
            { marksOnBoardArr.map((mark, index) => (
                <div 
                    key={index} 
                    id={(index + 1).toString()} 
                    onClick={() => { handleClick(index) }} 
                    className='target-box' 
                    style={ !winPattern.includes((index + 1).toString()) 
                        ? boxStyles
                        : winner !== undefined && winner[0] === 'x' 
                            ? xWinBoxStyles
                            : oWinBoxStyles
                    }
                >
                    { mark === '' && <HoverEffect playMode={playMode} playerOneMark={playerOneMark} currMark={currMark} /> }
                    { mark === 'x' && 
                        <img 
                            src={ winPattern.includes((index + 1).toString()) ? xMarkOutline : xMark} 
                            alt={'x mark on the target number ' + (index + 1).toString()} 
                            className="mark"
                        /> 
                    }
                    { mark === 'o' && 
                        <img 
                            src={ winPattern.includes((index + 1).toString()) ? oMarkOutline : oMark} 
                            alt={'o mark on the target number ' + (index + 1).toString()} 
                            className="mark"
                        /> 
                    }                    
                </div>
            ))}
        </div>
    )
}


type HoverEffectProps = {
    playMode: StateType['playMode']
    playerOneMark: StateType['playerOneMark']
    currMark: XOrO
}

function HoverEffect({ playMode, playerOneMark, currMark }: HoverEffectProps) {

    const [hovering, setHovering] = useState(false);

    const styles: React.CSSProperties = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        cursor: 'pointer'
    }

    let condition: boolean;
    if (hovering) {
        if (playMode === '1-player') {
            condition = (currMark === playerOneMark);   /* when it's computer's turn, no hover effect */
        } else {
            condition = true
        }
    } else {
        condition = false
    }

    return (
        <div onMouseLeave={() => { setHovering(false) }} style={styles}>
            <div 
                onMouseEnter={() => { setHovering(true) }}
                style={{...styles, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                { condition && <img src={currMark === 'x' ? xMarkOutline : oMarkOutline} alt='' className="mark" /> }
            </div>
        </div>
    )
}

export default Body;