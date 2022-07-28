import './App.css';

import React from 'react'
import StoreNavigation from '../components/navbar/navbar.component';
import Storefront from '../pages/storefront/storefront.page';

import UserDashboard from '../pages/user/user.page';
import UserAccount from '../pages/user/sub-pages/user.account';
import OrdersAccount from '../pages/user/sub-pages/orders.account';
import ReviewsAccount from '../pages/user/sub-pages/reviews.account';
import CouponsAccount from '../pages/user/sub-pages/coupons.account';
import RewardsAccount from '../pages/user/sub-pages/rewards.account';

import AdminPage from '../pages/admin-dashboard/admin.page';
import CategoryPage from '../pages/category/category.page';
import ProductOverview from '../pages/product-overview/product.page';
import CheckoutPage from '../pages/checkout/checkout-form.component';
import Dashboard from '../pages/admin-dashboard/sub-pages/dashboard.admin';
import ProductsAdmin from '../pages/admin-dashboard/sub-pages/products.admin';

import Footer from '../components/footer/footer.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <div>
        <StoreNavigation />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Storefront />} />
            <Route path='/Account' element={<UserDashboard />}>
              <Route path='User' element={<UserAccount />}/>
              <Route path='Orders' element={<OrdersAccount />}/>
              <Route path='Reviews' element={<ReviewsAccount />}/>
              <Route path='Coupons' element={<CouponsAccount />}/>
              <Route path='Rewards' element={<RewardsAccount />}/>
            </Route>
            <Route path='/Admin' element={<AdminPage />}>
              <Route path='Dashboard' element={<Dashboard />}/>
              <Route path='Products' element={<ProductsAdmin />}/>
            </Route>
            <Route path='/Product/:productID/:productName' element={<ProductOverview />} />
            <Route path='/Clothing/:category' element={<CategoryPage />} />
            <Route path='/Checkout' element={<CheckoutPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
