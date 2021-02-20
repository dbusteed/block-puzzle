import './App.css'
import Game from './components/game'
// import LevelMaker from './components/levelMaker'

const App = () => {
  return (
    <>
      <div className="main">
        <Game />
      </div>
      <div className="mobile-warning">
        <p>This site doesn't work on a screen this small, sorry!</p>
        <p>Please try again on a desktop!</p>
      </div>
    </>
  )
}

export default App
