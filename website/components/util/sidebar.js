import Head from 'next/head';
import content from '../data.json';

function Sidebar() {
  return (
      <div>
          <h1>{content.name}</h1>
          <h4>{content.steps.name}</h4>
      </div>
  )
}

export default Sidebar