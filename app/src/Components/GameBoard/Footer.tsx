import { StateType } from "../../types/types";

type FooterProps = {
    playerOneMark: StateType['playerOneMark']
    playMode: StateType['playMode']
    xWinCount: number
    oWinCount: number
    drawCount: number
}

function Footer({ playerOneMark, playMode, xWinCount, oWinCount, drawCount }: FooterProps) {

    let whoIsX: string;
    let whoIsO: string;
    if (playMode === '1-player') {
        whoIsX = playerOneMark === 'x' ? 'you' : 'cpu';
        whoIsO = whoIsX === 'cpu' ? 'you' : 'cpu';
    } else {
        whoIsX = playerOneMark === 'x' ? 'p1' : 'p2';
        whoIsO = whoIsX === 'p1' ? 'p2' : 'p1';
    } 

    return (
        <div className="footer">
            <div className='x-count-container count-container'>
                <div className="count-box-header">x ({whoIsX})</div>
                <div className="count-box-number">{xWinCount}</div>
            </div>
            <div className='draw-count-container count-container'>
                <div className="count-box-header">ties</div>
                <div className="count-box-number">{drawCount}</div>
            </div>
            <div className='o-count-container count-container'>
                <div className="count-box-header">o ({whoIsO})</div>
                <div className="count-box-number">{oWinCount}</div>
            </div>
        </div>
    )
}

export default Footer;