import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const PrivateRoute = (props) => {
    const token = localStorage.getItem('token');
    
    return token ? <Route {...props} /> : <Redirect to="/login" />
}

const AuthRoute = (props) => {
    const token = localStorage.getItem('token');
    
    return token ? <Redirect to="/dashboard" /> : <Route {...props} />; 
}

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path={["/dashboard","/add-product","/list-product","/list-user","/update-product/:id"]} component={Dashboard} exact />
                <AuthRoute path={["/login","/"]} component={SignIn} exact />
                <AuthRoute path="/signup" component={SignUp} exact />
            </Switch>
        </Router>
    )
};

export default Routes;
