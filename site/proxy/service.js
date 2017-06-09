import store from "../client/table-store"

const url = "ws://localhost:8011/stomp"

class proxy{

    client = Stomp.client(url) 
    
    getDataStream = function(message) {
      if (message.body) {
        store.dataStream.push(JSON.parse(message.body))
       } else { this.showErrorMessage.bind(this) } };

    connectCallback = function() {   
    const subscription = this.client.subscribe("/fx/prices", this.getDataStream.bind(this))}   

    connectToStream = function(){
    this.client.connect({}, this.connectCallback.bind(this), this.showErrorMessage.bind(this))}

    showErrorMessage(error){
        document.getElementById('stomp-status').innerHTML = error.headers.message || "Empty Message"}

    disconnectClient = function(){setTimeout(()=>{this.client.disconnect();}, 5000)}
    
}

const service = new proxy();

export default service

