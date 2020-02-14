import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Login } from './components/login/login'
import { Register } from './components/register/register.component'
import About from './components/about/about.component'
import Contact from './components/contact/contact.component'
import PageNotFound from './components/pageNotFoundComponent/pageNotFound.component'
import NavBar from './components/Headers/navigation /navBar.component'
import { Home } from './components/home/home.component'
import { readMore } from './components/home/readMore.component'
import Dashboard from './components/dashboard/dashboard.component'
import { Sidebar } from './components/Sidebar/sidebar.component'
import { addFeed } from './components/Sidebar/addfeed/addFeed.component'
import { viewBlogsComponent } from './components/Sidebar/viewBlogs/viewBlogsComponent'
import { editFeedComponent } from './components/Sidebar/addfeed/editFeedComponent'
import { searchFeedComponent } from './components/searchFeed/searchFeed.component'
const ProtectedRoute = ({ component: Component, ...rest }) => {

    return (
        <Route path={rest.path} render={(props) => (
            localStorage.getItem('token')
                ? <React.Fragment>
                    <div className="navbar">
                        <NavBar />
                    </div>
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="content">
                        <Component {...props} />
                    </div>
                </React.Fragment>
                : <Redirect to="/" /> //Remaining
        )} >

        </Route>
    )
}

const Routing = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/about' component={About}></Route>
                <ProtectedRoute path='/dashboard' component={Dashboard}></ProtectedRoute>
                <ProtectedRoute path='/contact' component={Contact}></ProtectedRoute>
                <ProtectedRoute path='/home' component={Home}></ProtectedRoute>
                <ProtectedRoute path='/readMore' component={readMore}></ProtectedRoute>
                <ProtectedRoute path='/add-blog' component={addFeed}></ProtectedRoute>
                <ProtectedRoute path='/edit-blogs/:id' component={editFeedComponent}></ProtectedRoute>
                <ProtectedRoute path='/search-blogs' component={searchFeedComponent}></ProtectedRoute>
                <ProtectedRoute path='/View-blogs' component={viewBlogsComponent}> </ProtectedRoute>
                <ProtectedRoute component={PageNotFound}></ProtectedRoute>
            </Switch>
        </Router>
    )


}
export default Routing;