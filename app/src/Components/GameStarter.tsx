import logo from '/assets/logo.svg';
import '../styles/GameStarter.css';
import { StateType, XOrO } from '../types/types';

type GameStarterProps = {
    setPlayMode: (playMode: StateType['playMode']) => void
    setPlayerOneMark: (e: React.ChangeEvent<HTMLInputElement>) => void
    playerOneMark: XOrO
}

function GameStarter({ setPlayMode, setPlayerOneMark, playerOneMark }: GameStarterProps) {
    
    let xFillStyle;
    let oFillStyle;

    if (playerOneMark === 'o') {
        xFillStyle = '#a8bfc9';
        oFillStyle = '#1a2a33';
    } else {
        xFillStyle = '#1a2a33';
        oFillStyle = '#a8bfc9';
    }

    return (
        <div className='GameStarter'>

            <div className='logo-container'>
                <img src={logo} alt='logo' />
            </div>

            <div className="player1-choices-section">

                <h1>pick player 1's mark</h1>

                <div className='player1-choices'>
                    <input 
                        type='radio' 
                        name='player1-choice' 
                        id='x' 
                        checked={playerOneMark === 'x'} 
                        onChange={setPlayerOneMark}
                    />
                    <label htmlFor='x'>
                        <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" 
                                fill={xFillStyle}
                            />
                        </svg>
                    </label>
                    <input 
                        type='radio' 
                        name='player1-choice' 
                        id='o' 
                        checked={playerOneMark === 'o'} 
                        onChange={setPlayerOneMark}
                    />
                    <label htmlFor='o'>
                        <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" 
                                fill={oFillStyle}
                            />
                        </svg>
                    </label>
                </div>

                <p>remember: x goes first</p>

            </div>

            <button className='vs-cpu-btn' onClick={() => { setPlayMode('1-player') }}>NEW GAME (VS CPU)</button>
            <button className='vs-player-btn' onClick={() => { setPlayMode('2-player') }}>NEW GAME (VS PLAYER)</button>

        </div>
    )
}

export default GameStarter;