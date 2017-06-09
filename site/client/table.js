import React from "react";
import Graph from "./graph"
import { observer } from "mobx-react"

@observer
export default class Table extends React.Component{

 constructor(props) {
      super(props);
  }
    
    oldData
    stream =[]
    span=[]
    counter = 0
   
    updateRows(){
          let obj = this.props.store.dataStream
          if (obj.length>0){
          obj.sort(function(a,b) {return a.lastChangeBid - b.lastChangeBid});
           

		  { for (var i =0; i <obj.length ; i++){     
                 let data = obj[i]

                 let index = ++this.counter
                 this.stream.push(<tr className="table-info" key={index}>
                        <td>{data.name}</td>
                        <td>{data.bestBid}</td>
                        <td>{data.bestAsk}</td>
                        <td>{data.lastChangeBid}</td>
                        <td>{data.lastChangeAsk}</td>
                        <td>{<Graph/>}</td>
                       </tr>) 
                        }  
                  }          
              }           
            return this.stream;
           }

    render(){
        const rows = this.updateRows();        
          return(
              <div className="container">
                <table className="table table-hover table-sm table-bordered table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                        <th>Name</th>
                        <th>Current Best Bid Price</th>
                        <th>Current Best Ask Price</th>
                        <th>Current Bid Last Changed</th>
                        <th>Current Ask Last Changed</th>
                        <th>Midprice</th>
                        </tr>
                    </thead>
                    <tbody>                        
                      {rows}            
                    </tbody>
                    </table>
              </div>
              )
    }
}