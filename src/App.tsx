import { useState, useEffect } from 'react'
import qs from 'qs';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const obj = qs.parse(location.search.slice(1))
  console.log('obj: ', obj)
  const page = obj.page
  return (
    <>
      <div style={{
        display: 'inline-block',
        background: 'red',
        width: 200,
        height: 100,
        lineHeight: '100px',
        fontSize: 50,
        cursor: 'pointer',
        marginBottom: 40,
        userSelect: 'none'
      }} onClick={async () => {
        if(window.electronApi) {
          await window.electronApi?.showNext?.()
        }
        // console.log(window.electronApi)
      }}>下一页</div>
      <div>当前是第{page+''}页</div>
    </>

  )
}

export default App
