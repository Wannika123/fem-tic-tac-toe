import winPatterns from "./winPatterns";
import { StateType, XOrO, TargetType } from "../types/types";

function comTurn(marksOnBoard: StateType['marksOnBoard'], playerOneMark: XOrO): TargetType {
    const comMark = playerOneMark === 'x' ? 'o' : 'x';

    const emptyTargets: TargetType[] = [];
    let key: TargetType;
    for (key in marksOnBoard) {
        if (marksOnBoard[key] === '') {
            emptyTargets.push(key)
        }
    }
    console.log(emptyTargets)
 
    /* computer's first turn */
    if (emptyTargets.length === 9) {
        const firstTargets: TargetType[] = ['1', '3', '5', '7', '9'];
        return firstTargets[Math.floor(Math.random() * 5)];
    } 

    /* computer's second turn -- if the player mark the first turn in the middle, com will mark a corner. In other cases, mark the middle */
    if (emptyTargets.length === 8) {
        const cornerTargets: TargetType[] = ['1', '3', '7', '9'];
        const middleTarget: TargetType = '5';

        if (emptyTargets.indexOf(middleTarget) < 0) {
            return cornerTargets[Math.floor(Math.random() * 4)];
        } else {
            return middleTarget
        }
    }
    
    /* computer's last turn */
    if (emptyTargets.length === 1) {
        return emptyTargets[0]
    }
    
    /*=============================================
    Here's the game logic:
    STEP 1 -- If com has win target, mark there. 
    ===============================================*/
    const findWinTargetOf = (mark: XOrO): (TargetType | void) => {
        for (let i = 0; i < emptyTargets.length; i++) {
            const filteredPatterns = winPatterns.filter(pattern => pattern.includes(emptyTargets[i]));
            for (let j = 0; j < filteredPatterns.length; j++) {
                if (filteredPatterns[j].every(a => marksOnBoard[a] === mark || a === emptyTargets[i])) {
                    return emptyTargets[i]
                }
            }
        }
    }
    
    const comWinTarget = findWinTargetOf(comMark)
    if (comWinTarget) {
        console.log('step1')
        return comWinTarget
    }

    /*=============================================
    STEP 2 -- If the player has win target, mark there. 
    ===============================================*/
    const playerWinTarget = findWinTargetOf(playerOneMark)
    if (playerWinTarget) {
        console.log('step2')
        return playerWinTarget
    }
    
    /* The following function returns patterns that 1 of its 3 targets has been marked 
    (by whatever mark that's passed as an argument), and the other 2 targets are still empty. */

    const findPotentialPatternsOf = (mark: XOrO) => {    
        const opponentMark = mark === 'x' ? 'o' : 'x';
        const potentialPatterns = [];

        for (let i = 0; i < winPatterns.length; i++) {
            const patternInOX = winPatterns[i].map(a => marksOnBoard[a]);
            if (patternInOX.includes(mark) && !patternInOX.includes(opponentMark)) {
                potentialPatterns.push(winPatterns[i])
            }
        }
        return potentialPatterns
    }

    /* The following function takes the potential patterns (from previous function),
    filter for only the empty target, then store them in an array and return it.  */

    const findPotentialTargetsOf = (potentialPatterns: [TargetType, TargetType, TargetType][]) => {
        let potentialTargets: TargetType[] = []

        for (let i = 0; i < potentialPatterns.length; i++) {
            const filtered = potentialPatterns[i].filter(a => marksOnBoard[a] === '');
            potentialTargets = [...potentialTargets, ...filtered]
        }
        return potentialTargets
    }

    /*=============================================
    STEP 3 -- If the computer has the target that can lead to the computer having 
    winning situations in 2 ways or more, mark there. (I will call such target the 'combo target'.)
    ===============================================*/

    const findComboTargetOf = (mark: XOrO): (TargetType[] | []) => {
        const potentialTargets = findPotentialTargetsOf(findPotentialPatternsOf(mark));       
        const comboTargetsArr: TargetType[] = [];
        
        /* Find the value (target) that appears more than once in the array */
        for (let i = 0; i < potentialTargets.length - 1; i++) {   
            const slicedArr = potentialTargets.slice(i + 1);
            const comboTarget = slicedArr.find(a => a === potentialTargets[i]);
            if (comboTarget) {
                comboTargetsArr.push(comboTarget)
            }
        }
        return comboTargetsArr;
    }

    const computerComboArr = findComboTargetOf(comMark);
    console.log(computerComboArr)
    if (computerComboArr.length > 0) {
        console.log('step3')
        return computerComboArr[Math.floor(Math.random() * computerComboArr.length)]
    }

    /*=============================================
    STEP 4 -- If the player has combo target, mark there. BUT if marking there leads the player 
    to mark at another combo target, then mark the target that force the player to mark at another
    target other than the combo target.
    ===============================================*/
    const playerComboArr = findComboTargetOf(playerOneMark);
    if (playerComboArr.length > 0) {
        if (playerComboArr.length === 1) {
            console.log('step4.1')
            return playerComboArr[0];
        } 
        let comPotentialPatterns = findPotentialPatternsOf(comMark);
        for (let i = 0; i < playerComboArr.length; i++) {
            for (let j = 0; j < comPotentialPatterns.length; j++) {
                /* remove the pattern that has the player's combo targets */
                comPotentialPatterns = comPotentialPatterns.filter(pattern => !pattern.includes(playerComboArr[i]))
            }
        }
        const potentialTargets = findPotentialTargetsOf(comPotentialPatterns);

        console.log('step4.2')
        return potentialTargets[Math.floor(Math.random() * potentialTargets.length)]
    }

    /*=============================================
    STEP 5 -- Mark the target that can lead to winning situation
    ===============================================*/
    const comPotentialTargets = findPotentialTargetsOf(findPotentialPatternsOf(comMark));
    if (comPotentialTargets.length > 0) {
        console.log('step5')
        return comPotentialTargets[Math.floor(Math.random() * comPotentialTargets.length)];
    }
    
    /*=============================================
    Lastly -- Return whatever target that's left
    ===============================================*/
    console.log('last')
    return emptyTargets[Math.floor(Math.random() * emptyTargets.length)];
}

export default comTurn;