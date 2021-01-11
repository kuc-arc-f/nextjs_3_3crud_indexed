import React from 'react'
import Link from 'next/link';
import Layout from '../components/layout'
// import LayoutAdmin from '../components/LayoutAdmin'
import Header from './Layout/AppHead';
//
export default class Page extends React.Component {
  constructor(props){
    super(props)
console.log(this.props.param )
  }  
  static async getInitialProps(ctx) {
    /*
    const res = await fetch('http://localhost:3000/api/test2')
    const json = await res.json()
console.log(json)
    */
    return { param: [] }
  }
  render() {
//console.log(this.props.items )
    const items = this.props.items
    return (
    <Layout>
      <div>
        <h1>Tasks</h1>
        <ul>
        </ul>
      </div>
    </Layout>
    )
  }
}
