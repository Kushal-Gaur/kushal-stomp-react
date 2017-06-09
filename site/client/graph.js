import React from "react"

const Sparkline = props => {
		let points = props.data.map( (y, x) => ( `${x * 20},${y*30}` ) ).join(' ');
    return <svg viewBox="0 0 200 30" width="100" height="30">
    	<polyline points={ points } stroke="#f00" fill="#fee" strokeWidth="2" />
    </svg>
};

class Graph extends React.Component{
  constructor(props)
  {
      super(props);
      this.state=({data:[0.25,1,0.5,0.75,0.25,1,0.25,0.5,0.75,1,0.25]});
  }

  componentDidMount(){
  	this.connection = new WebSocket('wss://echo.websocket.org');
    this.connection.onmessage = evt => { 
    	this.setState({
      	data : this.state.data.concat([ evt.data ])
      })
    };
    
    setInterval( _ =>{
    	this.connection.send( Math.random() )
    }, 1000 )
  }

  render() {
    return <Sparkline data={this.state.data.slice(-10) }/>;
  }
}

export default Graph