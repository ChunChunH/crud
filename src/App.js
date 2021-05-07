import React from "react"
import "./styles.css"
import EnhancedTable from './components/Table'
import { Provider} from 'react-redux'
import store from "./redux/store"

function App() {

  

  return (
    <Provider store={store}>
      <div >
        <EnhancedTable/>
      </div>
    </Provider>
    
  );
}

export default App;
