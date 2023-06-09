import React,{useState,useEffect} from 'react';
import logo from "../images/logo.png";
import "./todo.css";


const getLocalItems = () =>{
   let todoo = localStorage.getItem('todoos');
   console.log(todoo);

   if(todoo){
      return JSON.parse(localStorage.getItem('todoos'));
   }else{
      return [];
   }
}

export default function Todo() {

  const [inputData,setInputData]=useState('');
  const [items,setItems] = useState(getLocalItems());
  const [toggleBtn,setToggleBtn] = useState(true);
  const [editbtn,setEditbtn] = useState(null);

  const addItem =() => {
   if (!inputData) {
      alert("No task!!");
   }
   else if( inputData && !toggleBtn){
      setItems(
         items.map((elem)=>{
            if(elem.id === editbtn){
               return {...elem,name:inputData}
            }
            return elem;
         })
      );
      setToggleBtn(true);
      setInputData('');
      setEditbtn(null);
   }
   else{
      const allInputData = { id: new Date().getTime().toString(), name:inputData }
      setItems([...items, allInputData]);
      setInputData('');
  }
  };

  const editItem =(id) => {
     let newItem = items.find((elem) => {
      return elem.id === id;
     });
     console.log(newItem);

     setToggleBtn(false);
     setInputData(newItem.name);
     setEditbtn(id);
  };


  const deleteItem =(ind) => {
   //  console.log(ind);
    const updatedItems = items.filter((elem)=>{
       return ind !== elem.id;
    });

    setItems(updatedItems);
  }


  const removeAll=() => {
   setItems([]);
  }


  useEffect(() => {
   localStorage.setItem('todoos', JSON.stringify(items));
  },[items]);



  return (
  <>
     <div className="todo-main">
        <div className="todo-container">
         <figure className='img-icon'>
         <img className='imgtodoicon'
         src={logo} 
         alt="icon" />
         <figcaption className='icon-caption'>
            Add your tasks here
         </figcaption>
         </figure>

         <div className="addtasks">
           <input type="text" 
           placeholder='Add tasks..'
           value={inputData}
           onChange={(e) =>setInputData(e.target.value)}
           />{
             toggleBtn ? <i className="fa fa-solid fa-plus add-btn" 
             title="Add task"
             onClick={addItem}
             >
             </i>
             :
             <i className="fa fa-light fa-pen-to-square add-btn" 
                  title="Update task" 
                  onClick={addItem}></i>
           }
           
         </div>


         <div className="showtasks">
         {
               items.map((elem)=>{
                  return(
                  <div className='task' key={elem.id}>
                     <h3>{elem.name}</h3>

                     <div className='task-btn'>
                             {/* edit */}
                  <i className="fa fa-light fa-pen-to-square add-btn" 
                  title="Edit task" 
                  onClick={()=>editItem(elem.id)}></i>

                  <i className="fa fa-solid fa-trash add-btn" 
                  title="Delete task" 
                  onClick={()=>deleteItem(elem.id)}></i>
                     </div>

             
                  </div>
                  )

               })
            }
            
         </div>

         <div className="showtasks">
            
            <button 
            className='btn-effect'
            onClick={removeAll}
            
            >
               <span>
                  DELETE LIST
               </span>
            </button>
         </div>

        </div>
     </div>
  </>
  )
}
