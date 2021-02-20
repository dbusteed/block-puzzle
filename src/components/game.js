import React, { useState, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import { Button, Typography } from 'antd'
import { LockFilled } from '@ant-design/icons'
import puzzles from '../puzzles'

const { Title, Paragraph } = Typography

const Game = () => {

  const blockColors = [
    "#7617e2", // purple
    "#2c89d6", // blue-ish
    "#d86100", // orange
    "#43810f", // green
    "#a30500", // deep red
    "#e2df17", // yellow
  ]

  const [puzzleNumber, setPuzzleNumber] = useState(1)
  const [currentHeight, setCurrentHeight] = useState(0)
  const [layout, setLayout] = useState([])
  const [targetPx, setTargetPx] = useState(0)
  const [levelProgress, setLevelProgress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLevelProgress(
      Object.keys(puzzles).reduce((obj, lvl) => {
        if (lvl === '1') {
          obj[lvl] = 1
        } else {
          obj[lvl] = 0
        }
        return obj
      }, {})
    )
  }, [])
  
  useEffect(() => {
    let target_rows = puzzles[puzzleNumber].target
    let block_dims = puzzles[puzzleNumber].blocks
    setTargetPx(10 + target_rows*40)
    setCurrentHeight(document.getElementsByClassName("react-grid-layout")[0].clientHeight)
    
    setLayout(
      block_dims.reduce((arr, block, idx) => {
        arr.push({
          ...block,
          i: idx.toString(),
          x: Math.floor(Math.random() * 12) + 1, 
          y: Math.floor(Math.random() * 4) + 1,
        })
        return arr  
      }, [])
    )

  }, [puzzleNumber])

  useEffect(() => {
    checkBlocks()
  }, [currentHeight])

  const checkBlocks = () => {
    
    if (targetPx === currentHeight && !loading) {
      if ((puzzleNumber+1) in levelProgress) {
        setLevelProgress({...levelProgress, [puzzleNumber]: 2, [puzzleNumber+1]: 1})
      }
    }
    
    if ((((currentHeight-10)/40)%1) !== 0) {
      setTimeout(() => {
        setCurrentHeight(document.getElementsByClassName("react-grid-layout")[0].clientHeight)
      }, 500)
    }
    
    setLoading(false)
  }

  return (
    <div>

      <div className="header">
        <Title style={{"color": "white"}}>Block Puzzle</Title>
        <div className="level-buttons-container">
          {
            Object.entries(levelProgress).map(([k,v]) => (
              <div key={k}>
                <Button
                  onClick={() => {
                    setLoading(true)
                    setPuzzleNumber(Number(k))
                  }}
                  size={Number(k) === puzzleNumber ? 'large' : 'small'}
                  type={v === 2 ? "primary" : ""}
                  disabled={!v}
                  icon={v ? "" : <LockFilled />}
                >
                  {v ? k : ""}
                </Button>
              </div>
            ))
          }
        </div>
      </div>

      <div className="sub-header">
        <Paragraph className={puzzleNumber > 1 ? "hidden-help" : "shown-help"}>
          <b>HOW TO PLAY</b>
          <br />&emsp;arrange the blocks so they fit in the white square.
          <br />&emsp;use the buttons in the top-right corner to navigate to different levels.
        </Paragraph>
      </div>

      <div className="layout-container">

        <GridLayout
          className="layout"
          rowHeight={30}
          width={1000}
          cols={12}
          layout={layout}
          onLayoutChange={() => {
            setCurrentHeight(document.getElementsByClassName("react-grid-layout")[0].clientHeight)
          }}
          isDraggable={true}
          isResizable={false}
          isBounded={true}
        >
          {
            layout.map((item, idx) => (
              <div
                key={item.i}
                className="box"
                style={{"backgroundColor": blockColors[idx % blockColors.length]}}
              ></div>
            ))
          }
        </GridLayout>

        <div className="guide" style={{"height": `${targetPx}px`}}></div>
      </div>

    </div>
  )
}

export default Game


