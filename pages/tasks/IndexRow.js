import Link from 'next/link';
//
const IndexRow = props => (
  <li>
    ID: {props.id} , 
    <Link href={`/tasks/${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <Link href={`/tasks/edit/${props.id}`}>
      <a>[ edit ]</a>
    </Link>    
  </li>
);
export default IndexRow;
