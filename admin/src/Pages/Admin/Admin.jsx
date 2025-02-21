
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AdminComplaints from "../../Components/AdminComplaints/AdminComplaints";
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import { Routes,Route } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
        <Route path="/admincomplaints" element={<AdminComplaints />} />
      </Routes>
    </div>
  )
}

export default Admin
