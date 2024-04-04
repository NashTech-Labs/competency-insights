import './App.css';
import {AppRouters} from "./routes/AppRouters";
import { DataProvider } from './services/dataService';

function App() {
  return (
    <div className="App dark:bg-dark">
      <AppRouters />
    </div>
  );
} 

export default App;

