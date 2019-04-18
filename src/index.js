import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from './Spinner'

class App extends React.Component {
  state = { lat: null, errMsg: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          lat: position.coords.latitude
        });
      },
      err => {
        this.setState({ errMsg: err.message });
      }
    );
    console.log("Component rendered");
  }
  
  componentDidUpdate() {
    console.log("Component updated");
  }

  renderContent(){
    if (this.state.errMsg && !this.state.lat) {
        return <div>Error: {this.state.errMsg}</div>;
      }
      if (!this.state.errMsg && this.state.lat) {
        return <SeasonDisplay lat={this.state.lat} />;
      }
  
      return <Spinner message="Please allow the location"/>
  }

  render() {
    return(
        <div className="red">
        {this.renderContent()}
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
