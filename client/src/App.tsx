import './App.css'
import Router from './Router/Router';
import routes from './Router/Routes';


const App = () => {
  return (
    // wrapped routes with an all parent div with the background gradient
    <div className="app w-screen h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Router routes={routes} />
    </div>
  )
}

export default App
