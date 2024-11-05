import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import BoxSplit from './components/BoxSplit'
import ElementTransfer from './components/ElementTransfer'
import Game from './components/Game'
import InfiniteScroll from './components/InfiniteScroll'
import NestedList from './components/NestedList'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<ElementTransfer />}/>
          <Route path='/box-split' element={<BoxSplit />}/>
          <Route path='game' element={<Game />}/>
          <Route path='infinite-scroll' element={<InfiniteScroll />}/>
          <Route path='nested-list' element={<NestedList />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
