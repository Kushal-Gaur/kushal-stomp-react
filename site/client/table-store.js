import { autorun,computed, observable, action } from "mobx"
import service from "../proxy/service.js"

class TableStore {
 @observable dataStream = [];
 
  constructor()
  {
    this.filterData();
  }

  @action filterData(){
       service.connectToStream();
       service.disconnectClient();
  }

}
const store = window.TableStore = new TableStore();

export default store;
