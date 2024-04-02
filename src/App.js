import './App.css';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { Toaster } from "react-hot-toast";
import Header from './components/Header'
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';


function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={30}
          containerClassName="notification-container"
          toastOptions={{
            className: "notification-toast",
            duration: 1500,
          }}
        />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
