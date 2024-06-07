import { Component } from "react";
import GameStarter from "./GameStarter";
import GameBoard from "./GameBoard/GameBoard";
import { StateType, TargetType } from "../types/types";

class Game extends Component<{}, StateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            playMode: null,
            xTurn: true,    /* 'x' goes first */
            playerOneMark: 'o',   /* player1's mark is 'o' by default */
            marksOnBoard: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: ''
            }
        }
        this.setPlayMode = this.setPlayMode.bind(this);
        this.setPlayerOneMark = this.setPlayerOneMark.bind(this);
        this.updateMark = this.updateMark.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.restart = this.restart.bind(this);
    }

    setPlayMode(playMode: StateType['playMode']) {
        this.setState({
            playMode: playMode
        })
    }

    setPlayerOneMark(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.id === 'x' || e.target.id === 'o') {
            this.setState({
                playerOneMark: e.target.id
            })
        }        
    }

    updateMark(target: TargetType, comIsPlaying = false) {
        
         /* Return if the target has already been marked. */
        if (this.state.marksOnBoard[target]) {   
            return;
        }
        
        const currMark = this.state.xTurn ? 'x' : 'o';

        /* If the player clicks the target when it's computer's turn, return. */
        if (this.state.playMode === '1-player' && this.state.playerOneMark !== currMark && !comIsPlaying) {
            console.log('hi')
            return;
        }

        this.setState(state => ({
            xTurn: !state.xTurn,
            marksOnBoard: {...state.marksOnBoard, [target]: currMark }
        }))
    }

    clearBoard() {
        let emptyBoard = {...this.state.marksOnBoard};
        
        let key: TargetType;
        for (key in emptyBoard) {
            emptyBoard[key] = '';
        }

        this.setState({
            marksOnBoard: emptyBoard,
            xTurn: true
        })
    }

    restart() {
        this.clearBoard();

        this.setState({
            playMode: null
        })
    }

    render() {
        return (
            <>
                { this.state.playMode === null && 
                    <GameStarter 
                        setPlayMode={this.setPlayMode}
                        setPlayerOneMark={this.setPlayerOneMark}
                        playerOneMark={this.state.playerOneMark}
                    />
                }
                { this.state.playMode !== null &&
                    <GameBoard 
                        {...this.state}
                        updateMark={this.updateMark}
                        clearBoard={this.clearBoard}
                        restart={this.restart}
                    />
                }
            </>
        )
    }
}

export default Game