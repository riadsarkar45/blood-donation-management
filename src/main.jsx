import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Menu from './components/Nav/Menu.jsx'
import Registraion from './components/Registration/Registraion'
import SignIn from './components/SignIn/SignIn'
import DonateCards from './components/Pages/DonateCards.jsx'
import Detail from './components/Pages/DonorsCounter/Detail.jsx'
import Search from './components/Pages/Search/Search.jsx'
import Request from './components/Pages/DonationRequest/Request.jsx'
import AuthProvider from './components/AuthProvider/AuthProvider.jsx'
import AllUser from './Dashboard/AllUsers/AllUser.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WriteBlog from './Dashboard/Blog/WriteBlog.jsx'
import DonationReq from './Dashboard/DonationReq/DonationReq.jsx'
import AllDonation from './Dashboard/AllDonation/AllDonation.jsx'
import ManageContent from './Dashboard/ContentManagement/ManageContent.jsx'
import Payment from './Dashboard/Payment/Payment.jsx'
import Sidebar from './Dashboard/Sidebar/Sidebar.jsx'
import Profile from './Dashboard/Profile/Profile.jsx'
import PaymentHistory from './Dashboard/PaymentHistory/PaymentHistory.jsx'
import Home from './Dashboard/Home/Home.jsx'
import PrivateRoute from './components/AuthProvider/PrivateRoute.jsx'
import AdminRoute from './components/AuthProvider/AdminRoute.jsx'
import UpdateDonation from './Dashboard/CreatDonation/UpdateDonation.jsx'
import AddNewReq from './Dashboard/AddNewReq/AddNewReq.jsx'
import Blog from './components/Pages/Blogs/Blog.jsx'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu></Menu>,
    children: [
      {
        path: "/",
        element: <DonateCards></DonateCards>,
      },
      {
        path: "/detail/:id",
        element: <PrivateRoute><Detail></Detail></PrivateRoute>,
        loader: ({ params }) => fetch(`https://assignment-12-server-seven-gamma.vercel.app/donation-detail/${params.id}`)
      },
      {
        path: "/search",
        element: <Search></Search>,
        loader: () => fetch('https://assignment-12-server-seven-gamma.vercel.app/requests-public')
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/donation-request",
        element: <Request></Request>,
        loader: () => fetch('https://assignment-12-server-seven-gamma.vercel.app/requests-public')
      },
      {
        path: "/registration",
        element: <Registraion></Registraion>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
    ]
  },

  //dashboard route

  {
    path: "dashboard",
    element: <Sidebar></Sidebar>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        path: "/dashboard/all-users",
        element: <AdminRoute><PrivateRoute><AllUser></AllUser></PrivateRoute></AdminRoute>,
        loader: () => fetch('https://assignment-12-server-seven-gamma.vercel.app/userCount'),
      },
      {
        path: "/dashboard/creat-donation-request",
        element: <PrivateRoute> <AddNewReq></AddNewReq> </PrivateRoute>
      },
      {
        path: "/dashboard/my-donation-request/:email",
        element: <PrivateRoute><DonationReq></DonationReq></PrivateRoute>,
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: <PrivateRoute><WriteBlog></WriteBlog></PrivateRoute>
      },
      {
        path: "/dashboard/donate",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },

      // only admin
      {
        path: "/dashboard/all-donation-req",
        element: <PrivateRoute><AllDonation></AllDonation></PrivateRoute>
      },
      {
        path: "/dashboard/content-management/all-blogs",
        element: <PrivateRoute><ManageContent></ManageContent></PrivateRoute>,
        loader: () => fetch('https://assignment-12-server-seven-gamma.vercel.app/blogsCount'),
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: "/dashboard/donation-history",
        element: <AdminRoute><PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute></AdminRoute>
      },
      {
        path: "/dashboard/edit-donation/:id",
        element: <PrivateRoute><UpdateDonation></UpdateDonation></PrivateRoute>,
        loader: ({ params }) => fetch(`https://assignment-12-server-seven-gamma.vercel.app/edit-donation/${params.id}`)
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
