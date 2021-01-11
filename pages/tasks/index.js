import Link from 'next/link';
import Dexie from 'dexie';

import Layout from '../../components/layout'
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';
import IndexRow from './IndexRow';
//
export default class Page extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: '', items_org: ''}
    this.handleClickExport = this.handleClickExport.bind(this);
  }  
  async componentDidMount(){
    try{
      var config = LibTask.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );  
      var items = await this.db.tasks.toArray()
      this.items_org = items
      items = LibDexie.get_reverse_items(items)
      this.setState({ data: items })
//  console.log( items )
    } catch (err) {
      alert(err)
      console.log(err);
    }     
  }
  tabRow(){
    if(this.state.data instanceof Array){
console.log(this.state.data )
      return this.state.data.map((item, index) => {
        return (<IndexRow key={index}
                id={item.id} title={item.title} />       
        )
      })      
    }
  }
  handleClickExport(){
    console.log("handleClickExport:")
//    var content = JSON.stringify( this.state.data );
    var content = JSON.stringify(this.items_org);
//console.log(this.items_org)
    var blob = new Blob([ content ], { "type" : "application/json" });
    var fname = "tasks.json"
    if (window.navigator.msSaveBlob){
      console.log("#-msSaveBlob")
    }else{
      console.log("#-msSaveBlob-false")
      document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
  }
  render() {
    return (
    <Layout>
      <div className="container">
        <h3>Tasks</h3>
        <div className="row">
          <div className="col-sm-6">
            <Link href="/tasks/create">
              <a className="btn btn-sm btn-primary mt-0">New</a>
            </Link>          
          </div>
          <div className="col-sm-6">
            <a className="btn btn-sm btn-outline-primary mt-0" id="download" download="tasks.json"
              onClick={this.handleClickExport}>
              Export
            </a>
            <Link href="/tasks/import">
                <a className="btn btn-sm btn-primary ml-2" target="_blank">Import</a>
            </Link>            
          </div>          
        </div>
        <ul>
        {this.tabRow()}
        </ul>
      </div>
    </Layout>
    )
  }
}
