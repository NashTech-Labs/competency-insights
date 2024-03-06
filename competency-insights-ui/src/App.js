import './App.css';
import {AppRouters} from "./routes/AppRouters";
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="App dark:bg-dark">
    
        <Header/>
            <AppRouters />
        <Footer/>
      </div>
  );
} 

export default App;

