import './App.css'
import SideBar from './Sidebar/SideBar'
import {Routes,Route} from "react-router-dom"
import DashBoard from './Dashboard/DashBoard'
import History from './History/History'
import Admin from './Admin/Admin'
import Login from './Login/Login'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='App'>

       <SideBar />
       <Routes>
        <Route path='/' element={<Login />} />
         <Route path='/dashboard' element={<DashBoard/>} />
         <Route path='/history' element={<History/>} />
         <Route path='/admin' element={<Admin/>} />
       </Routes>
    </div>
  )
}

export default App
