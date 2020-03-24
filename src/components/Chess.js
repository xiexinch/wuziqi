import React from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import { airingGo, myWin, airingWin, count, wins, over } from '../util'

let blackItems = []
let whiteItems = []

class Chess extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      color: 'yellow',
      blackItems: [],
      whiteItems: [],
      chessborad: [],
      roundTurn: 0
    }
  }
  componentDidMount() {
    let newchessbord = []
    for (let i = 0; i < 12; i++) {
      newchessbord[i] = []
      for (let j = 0; j < 12; j++) {
        newchessbord[i][j] = 0
      }
    }
    this.setState({
      chessborad: newchessbord
    })
  }

  handleTap = (e) => {
    if (over) {
      alert("重新开始!")
      window.location.reload(true)
    }
    let x = Math.floor((e.evt.changedTouches[0].clientX - 10 ) / 30)
    let y = Math.floor(e.evt.changedTouches[0].clientY / 30) - 2
    const { chessborad } = this.state
    if (chessborad[y][x] === 0) {
      blackItems[Math.floor(x * 12) + y] = 1
      this.setState({
        blackItems: blackItems,
        roundTurn: 1
      })
      chessborad[y][x] = 1
      for (let k = 0; k < count; k ++) {
        if (wins[y][x][k]) {
            // 如果存在赢法,则玩家此赢法胜算+1(赢法为5胜取胜)
            myWin[k] ++;
            // 如果存在赢法,则电脑此赢法胜算赋值为6(永远不等于5,永远无法在此处取胜)
            airingWin[k] = 6;
            // 玩家落子后,此处赢法数组凑够5,玩家取胜
            if (myWin[k] === 5) {
                window.alert("You Win");
                // 游戏结束
                over = true
                break
            }
        }
      }

    }
    if (!over) {
      let uv = airingGo(chessborad)
      whiteItems[Math.floor(uv[1] * 12) + uv[0]] = 1
      //chessborad[uv[1]][uv[0]] = 2
      this.setState({
        whiteItems: whiteItems,
        chessborad: chessborad
      })
    }

  }

  render() {
    const { color, blackItems, whiteItems } = this.state

    const rows = [10, 40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 340]
    const cols = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

    return (
      <Stage width={window.innerWidth} height={window.innerHeight} onTap={this.handleTap}>
      <Layer x={20}>
      <Rect x={0} y={10} width={330} height={330} fill={color}   />
      {
        rows.map((item, index) => (
          <Line 
            x={0}
            y={item}
            key={index}
            points={[0, 0, 330, 0]}
            stroke="black"
          ></Line>
        ))
      }
      {
        cols.map((item, index) => (
          <Line 
            x={item}
            y={10}
            key={index}
            points={[0, 0, 0, 330]}
            stroke="black"
          ></Line>
        ))
      }
      {
        blackItems.map((row, index) => {
          return row === 1 ? (<Circle y={Math.floor(index % 12) * 30 + 10} x={Math.floor(index / 12 ) * 30 } radius={10} key={index} fill="black"/>) : (<React.Fragment></React.Fragment>)
        })
      }
      {
        whiteItems.map((row, index) => {
          return row === 1 ? (<Circle y={Math.floor(index % 12) * 30 + 10} x={Math.floor(index / 12) * 30 }  radius={10} key={index} fill="white"/>) : (<React.Fragment></React.Fragment>)
        })
      }  
      </Layer>
      </Stage>
    )
  }
}

export default Chess