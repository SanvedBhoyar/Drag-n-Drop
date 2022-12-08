import { useRef, useState } from 'react';
import './App.css';

// const testDropList = ['A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']

function App() {
  const draggablesList = ['A', 'B', 'C'];
  const [droplist, setDroplist] = useState([]);
  const dragStartIndex = useRef(null);
  const dragOverIndex = useRef(null)

  const deleteItem = (index) => {
    // we use index here instead of the item itself because items can be duplicate
    // and if we filter duplicates and delete them all the duplicates will be deleted not just the item at that index
    const newList = [...droplist];
    newList.splice(index, 1);
    setDroplist(newList);
  }

  const handleDrop = (e) => {
    // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
    e.preventDefault();
    const newList = [...droplist, draggablesList[dragStartIndex.current]];
    setDroplist(newList);
  }

  return (
    <div className="app">

      <div className="draggables-container">
        {
          draggablesList.map((item, index) => (
            <div
              key={index}
              className="draggable"
              draggable
              onDragStart={() => dragStartIndex.current = index}
            >
              {item}
            </div>
          ))
        }
      </div>

      <div className="dropbox-container">
        <div className="folder-image-container">
          {/* By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element */}
          {/* When using Webpack you need to require images in order for Webpack to process them, which would explain why external images load while internal do not, so instead of <img src={"/images/resto.png"} /> you need to use <img src={require('/images/image-name.png')} /> replacing image-name.png with the correct image name for each of them. That way Webpack is able to process and replace the source img. */}
          <img
            className="folder-image"
            src={require("./assets/images/folder-image.jpg")}
            alt="DropBox"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="folder-image"
          >
            <path
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e)}
              d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
          </svg> */}

          <div className="item-count-icon">{droplist.length}</div>
        </div>
      </div>

      <div className='drop-list-container'>
        <h1 className="drop-list-heading">Drop List</h1>
        <div className="drop-list">

          {
            droplist?.length > 0
              ?
              droplist.map((item, index) => (
                <div key={index} className="drop-item">
                  <span>{item} Dropped</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="delete-icon"
                    onClick={() => deleteItem(index)}
                  >
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                  </svg>
                </div>
              ))
              :
              <div>No Items Dropped</div>
          }
        </div>
      </div>

    </div >
  );
}

export default App;
