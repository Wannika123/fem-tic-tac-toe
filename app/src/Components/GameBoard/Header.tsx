import grayX from '/assets/icon-x-gray.svg';
import grayO from '/assets/icon-o-gray.svg';
import logo from '/assets/logo.svg';
import restartIcon from '/assets/icon-restart.svg';

type HeaderProps = {
    currMark: 'x' | 'o'
    setDialogOpening: React.Dispatch<React.SetStateAction<boolean>>
}

function Header({ currMark, setDialogOpening }: HeaderProps) {
    
    return (
        
        <div className='header'>
            
            <img className='logo' src={logo} alt='logo icon' />
            
            <div className='whose-turn'>
                { currMark  === 'x'
                    ? <img src={grayX} alt='x' />
                    : <img src={grayO} alt='o' />
                }
                <div>turn</div>
            </div>
            <div className='restart-btn-container'>
                <button className='restart-btn' onClick={() => setDialogOpening(true)}>
                    <img src={restartIcon} alt='restart button' />
                </button>
            </div>
        </div>
    )
}

export default Header;