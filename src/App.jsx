import React, { useState } from 'react'

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);

    
  const submit_handler = (e) => {
    const copyTask = [...tasks]; // Spread Operator to create a copy of the tasks array
    copyTask.push({title, details}); // Add a new object containing the title and 
    // details to the copyTask array using the push method
    setTasks(copyTask); // Update the state with the modified copyTask array,
    //  which will trigger a re-render of the component to reflect the changes in the UI
      
    e.preventDefault(); // Prevent the default form submission behavior, which would cause a page reload
    console.log(tasks); 
    setTitle(""); // Clear the title input field by setting the title state to an empty string
    setDetails(""); // Clear the details input field by setting the details state to an empty string
    }
    
  const delete_handler = (idx)=> {
    const copyTask = [...tasks]; // Spread Operator to create a copy of the tasks array
    console.log("Delete Button Clicked", copyTask[idx]);
    copyTask.splice(idx,1); // Remove the element at the specified index (idx) from the copyTask array
    setTasks(copyTask); // Update the state with the modified copyTask array, which will trigger
    //  a re-render of the component to reflect the changes in the UI
  }

  return (
    <div className='flex flex-col lg:flex-row h-screen bg-black text-white'>
      <form
        onSubmit={(e)=>{
          submit_handler(e); 
        }} 
        className='w-full lg:w-1/2 p-10 flex items-start flex-col gap-5'>  
        <h1 className='text-4xl font-bold '>Add Notes</h1>
        
        {/* First Input, Note Heading */}
        <input 
        className='bg-black text-white w-full px-5 py-2 rounded outline-none border-2'
        type="text" 
        placeholder="Enter your Note Heading" 
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
        />

        {/* Second Input, Note Details */}
        <textarea 
        className='bg-black text-white h-32 w-full py-2 px-5 rounded-md border-2'
        placeholder="Enter Details" 
        value={details}
        onChange={(e)=>{
          setDetails(e.target.value)
        }}
        ></textarea>
        <button
        className='bg-white active:scale-95 text-black w-full py-2 px-5 rounded-md border-2'>
        Add Note
        </button>
      </form>

      <div className='w-full lg:w-1/2 p-10'>
        <h1 className='text-4xl font-bold '>Recent Notes</h1>
        <div className='flex flex-wrap gap-10 mt-5 overflow-auto h-full'>
          {tasks.map((elem, idx)=>{
            return(
            <div key={idx} className='h-52 w-40 rounded-2xl bg-cover 
            bg-[url(https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png)]
             text-black flex flex-col justify-between p-5 overflow-hidden'>
                <div className='flex-1 overflow-y-auto'>
                  <h2 className='font-bold text-lg mb-2'>{elem.title}</h2>
                  <p className='text-sm'>{elem.details}</p>
                </div>
                <button onClick={()=>{
                  delete_handler(idx);
                }} className='bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full mt-4 w-full transition-colors duration-200'>Delete</button>
              </div>  
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default App
App