import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Homepage from './components/pages/home'
import Water from './components/pages/water'

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/water" exact component={Water} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
