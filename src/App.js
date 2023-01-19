import  SimpleSlider from'./SimpleSlider.js'
import './App.css';


function App() {
  const userNames = ["gaearon", "acdlite", "yyx990803", "unclebob", "martinfowler"];
 
  return (
    <div className="App">
      <SimpleSlider users={userNames}></SimpleSlider>
    </div>
  );
}

export default App;
