import React, { useEffect, useState } from 'react';
import delete_icon from '../src/assets/delete_icon.png'
import Light_icon from '../src/assets/Light_icon.png'
import Dark_icon from '../src/assets/Dark_icon.png'
const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask , setNewTask] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuotes = async () => {
        try {
                const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
                headers: { 'X-Api-Key': '/bYO9lHU7tNy4ZwQqmUo4Q==omAK1Nl19Gjj319Z' }
                });
                if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
                const data = await response.json();
                setQuotes(data);
            }catch (err) {
            setError(err.message);
            }
        };
        fetchQuotes();
    }, []);


    function toggleDarkMode() {
        setDarkMode(prev => !prev);
    }
    React.useEffect(() => {
        document.body.style.backgroundColor = darkMode ? 'black' : 'white';
    }, [darkMode]);
    function handleInputChange(event){
            setNewTask(event.target.value);
    }
    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t=>[...t,newTask]);
            setNewTask("");
        }
    }
    function deleteTask(index){
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
    }
    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function moveTaskDown(index) {
        if (index < tasks.length - 1 ) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
    }
}

  return (
    <div>
        <div className="mode-toggle-container">
            <img
                src={darkMode ? Dark_icon : Light_icon}
                alt={darkMode ? "dark" : "light"}
                className={darkMode ? "dark" : "light"}
                onClick={toggleDarkMode}
                style={{ cursor: 'pointer' }}
            />
        </div>
    <div className = "to-do-List">
      <h1>CheckList</h1>
      <div>
        <input type="text" placeholder="Task?" value={newTask} onChange={handleInputChange}/>
        <button className="Add-btn" onClick={addTask}>ADD</button>
      </div>
      <ol>
        {tasks.map((task,index)=>
            <li key={index}>
                <span className="text">{task}</span>
                <img src={delete_icon} className="delete-btn" onClick={()=> deleteTask(index)}/>
                <button className="Moveup" onClick={()=>moveTaskUp(index)}>👆</button>
                <button className="MoveDown" onClick={()=>moveTaskDown(index)}>👇</button>

            </li>
        )}
      </ol>
      <h2>Quote:</h2>
        {error && <div style={{color: 'red'}}>Error: {error}</div>}
        <ul>
          {quotes.map((quote, i) => (
            <li key={i}>{quote.quote}</li>
            ))}
        </ul>
    </div>
    </div>
  )
}

export default ToDoList
