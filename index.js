import React from "react"
import ReactDOM from "react-dom"
import Table from "./site/client/table"
import store from "./site/client/table-store"

require('./site/index.html')

ReactDOM.render(<Table store={store} />, document.getElementById('stomp-status'))

global.DEBUG = false

client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}
