export type StateType = {
    playMode: null | '1-player' | '2-player'
    xTurn: boolean
    playerOneMark: XOrO
    marksOnBoard: {
        [index in TargetType]: XOrO | ''
    }
}

export type TargetType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type XOrO = 'x' | 'o'