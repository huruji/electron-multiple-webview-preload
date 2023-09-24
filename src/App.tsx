import { useState, useEffect } from 'react';
import qs from 'qs';
import images from './images';
import useHttp from 'use-http';
import './App.css';

function App() {
  const [imgs, setImgs] = useState([]);
  const { get } = useHttp('https://tuapi.eees.cc/api.php');

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < 8; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(0);
          }, 200);
        });
        const index = Math.floor(Math.random() * images.length)
        setImgs((imgs) => [...imgs, <img style={{ width: 200, height: 200 }} src={images[index]} />]);
      }
    };
    fetchData();
  }, []);
  const obj = qs.parse(location.search.slice(1));
  console.log('obj: ', obj);
  const page = obj.page;
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
        if (window.electronApi) {
          await window.electronApi?.showNext?.();
        }
        // console.log(window.electronApi)
      }}>下一页</div>
      <div>当前是第{page + ''}页</div>
      {imgs}
    </>

  );
}

export default App;
