import Link from 'next/link';
import Router from 'next/router'
import React, {Component} from 'react';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';

import Layout from '../../components/layout'
import Header from '../Layout/AppHead';
import IndexRow from './IndexRow';
//
export default class extends Component {
  constructor(props){
    super(props)
    this.state = {title: '', content: ''}
    this.handleClick = this.handleClick.bind(this);
//console.log(props)
  }
  componentDidMount(){
    var config = LibTask.get_const()
    this.db = new Dexie( config.DB_NAME );
    this.db.version(config.DB_VERSION).stores( config.DB_STORE );
    var self = this
    window.addEventListener("load", function() {
        window.document.getElementById("file1").addEventListener("change", function() {
            self.change_proc()
        });
    });                    
  }  
  change_proc(){
    console.log("#-change_proc")
    var self = this
    var files = window.document.getElementById('file1').files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log("i: " + i );                
      console.log("Name: " + file.name);
      console.log("Size: " + file.size);
      console.log("Type: " + file.type);
      console.log("Date: " + file.lastModified);
      console.log("Date: " + file.lastModifiedDate);
      
      var reader = new FileReader();
      reader.onload = async function(evt) {
        console.log("State: " + evt.target.readyState);
        var result =evt.target.result;
        var dat = JSON.parse(result || '[]')
console.log( dat )
        await self.add_item(dat)
      };
      reader.onerror = function(evt) {
        console.log(evt.target.error.name);
      };
      reader.readAsText(file, "utf-8");             
    }    
  }
  handleClick(){} 
  async add_item(items){
    try {
      var self = this
      await this.db.tasks.clear()
      await items.forEach(async function(item){
        var task = {
            title: item.title,
            content: item.content,
            created_at: new Date(item.created_at),
        }
        await self.db.tasks.add( task)
      });
      setTimeout(function () {
          alert("Complete ,import data success.");
          console.log("# timer.cb")
      }, 1000)       
//      Router.push('/tasks');
    } catch (error) {
      console.error(error);
    }    
  } 
  render() {
    return (
    <Layout>
      <div className="container">
        <hr className="mt-2 mb-2" />
        <h3 className="mt-2">Tasks- import:</h3>
        <hr />
        <p>select , json file</p>            
        <div>
          <input type="file" id="file1" className="btn btn-outline-primary" />
        </div>
        <br />        
      </div>
    </Layout>
    )    
  } 
}

