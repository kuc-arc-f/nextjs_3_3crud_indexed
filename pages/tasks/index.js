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
    this.state = {data: ''}
  }  
  async componentDidMount(){
    try{
      var config = LibTask.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );  
      var items = await this.db.tasks.toArray()
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
  render() {
    return (
    <Layout>
      <div className="container">
        <Link href="/tasks/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>          
        <h1>Tasks</h1>
        <ul>
        {this.tabRow()}
        </ul>
      </div>
    </Layout>
    )
  }
}
