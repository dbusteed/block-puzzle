import React, { useState, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import { Button } from 'antd'
import puzzles from '../puzzles'

const LevelMaker = () => {

  const blockColors = [
    "#7617e2", // purple
    "#2c89d6", // blue-ish
    "#d86100", // orange
    "#43810f", // green
    "#a30500", // deep red
    "#e2df17", // yellow
  ]

  let puzzleNumber = 5
  const [layout, setLayout] = useState([])
  const [targetPx, setTargetPx] = useState(0)
  
  useEffect(() => {
    let target_rows = puzzles[puzzleNumber].target
    let block_dims = puzzles[puzzleNumber].blocks
    setTargetPx(10 + target_rows*40)
    
    setLayout(
      block_dims.reduce((arr, block, idx) => {
        arr.push({
          ...block,
          i: idx.toString(),
          x: Math.floor(Math.random() * 10), 
          y: 0
        })
        return arr  
      }, [])
    )

  }, [puzzleNumber])

  return (
    <div>

      <Button
        size="large"
        type="primary"
        onClick={() => {
          let obj = {}
          obj.target = (targetPx - 10) / 40
          obj.blocks = JSON.parse(JSON.stringify(layout, ['w', 'h']))
          alert(JSON.stringify(obj))
        }}
      >Show Layout</Button>

      <Button 
        style={{marginLeft: "1rem"}}
        size="large"
        type="primary"
        onClick={() => {
          let newKey = layout[layout.length-1].i
          newKey += newKey
          setLayout([...layout, {i: newKey, x: 0, y: 0, w: 2, h: 2}])
        }}
      >Add Block</Button>

      <div className="layout-container" style={{"marginTop": "2rem"}}>

        <GridLayout
          className="layout"
          rowHeight={30}
          width={1000}
          cols={12}
          layout={layout}
          onLayoutChange={e => {
            setLayout(e)
            setTargetPx(document.getElementsByClassName("react-grid-layout")[0].clientHeight)
          }}
          isDraggable={true}
          isResizable={true}
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

export default LevelMaker
