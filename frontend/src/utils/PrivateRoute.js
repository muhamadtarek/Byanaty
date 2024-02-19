import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)

    return !user ? <Navigate to='/login'/> : children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};