import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps= {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      board.push([])
      for (let j = 0; j < this.props.ncols; j++) {
          board[i].push(Math.random() < this.props.chanceLightStartsOn)
      }
      
    }
    console.log(board)
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log(coord)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    let state = true


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y,x)
    flipCell(y-1,x)
    flipCell(y+1,x)
    flipCell(y,x+1)
    flipCell(y,x-1)

    function blackout() {
      for (let i = 0; i < nrows; i++) {
        for (let j = 0; j < ncols; j++) {
          if (board[i][j] === true) {
            state = false;
          }
        }
      }
    }
  
    blackout();

    this.setState({board: board, hasWon: state});
  }


  /** Render game board or winning message. */

  render() {
    if(this.state.hasWon === true) {
      return(
        <div>
        <h1 className="youwon"><div className="neon-orange">YOU</div> <div className="neon-blue">WON</div></h1>
        <img className="lo-image" alt="smile" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mr._Smiley_Face.svg/1200px-Mr._Smiley_Face.svg.png" />
        </div>
      )
    }
    // make table board
    let tblBoard = []
    for (let y = 0; y < this.props.nrows; y++) {
      let row = []
      for (let x = 0; x < this.props.ncols; x++){
        let coordinates = `${y}-${x}`
        row.push(<Cell key={coordinates} isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coordinates)}/>)
      }
      tblBoard.push(<tr>{row}</tr>)
    }
    // TODO

    return(
      <div>
      <h1 className="Board-title"><div className="neon-orange">Lights</div><div className="neon-blue">Out</div></h1>
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
      </div>
    )
  }
}


export default Board;
