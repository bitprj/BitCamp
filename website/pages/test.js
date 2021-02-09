import Head from 'next/head';
import content from '../data.json';

function Test() {
  return (
      <div>
          <h1>{content.content.name}</h1>
          <h1>Hello</h1>
      </div>
  )
}

export default Test