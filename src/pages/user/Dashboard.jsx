import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useSelector } from 'react-redux';  // Redux से useSelector को आयात करें
import UserMenu from '../../components/Layout/UserMenu';

const Dashboard = () => {
    const { user} = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><UserMenu/></div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name : {user?.name}</h3>
              <h3>User Email : {user?.email}</h3>
              <h3>User Contact : {user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard