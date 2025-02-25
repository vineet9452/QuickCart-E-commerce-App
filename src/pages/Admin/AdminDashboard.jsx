import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useSelector } from 'react-redux';  // Redux से useSelector को आयात करें

const AdminDashboard = () => {
    const { user} = useSelector((state) => state.auth);    
  return (
    <Layout>
          <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3 ">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                          <h3>Admin Name : {user?.name}</h3>
                          <h3>Admin Email : {user?.email}</h3>
                          <h3>Admin Contact : {user?.phone}</h3>
                    </div>
                </div>
            </div>
          </div>
    </Layout>
  )
}

export default AdminDashboard