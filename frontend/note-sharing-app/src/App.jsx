
import Login from './components/Login';
// const ProtectedRoute = ({ children }) => {
//     const { token } = useSelector((state) => state.auth);
//     return token ? children : <Navigate to="/login" />;
// };

function App() {
    return (
        <>
        <Login/>
        </>
    );
}

export default App;