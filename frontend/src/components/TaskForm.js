import React from 'react';
import axios from 'axios';

export default function TaskForm() {
    const [editMode, setEditMode] = React.useState(false);
    const [task, setTask] = React.useState([]);
    const [taskTitle, setTaskTitle] = React.useState('');
    const [taskDescription, setTaskDescription] = React.useState('');
    const [taskId, setTaskId] = React.useState('');

    React.useEffect(() => {
        showTodos();
    }
        , []);

    const showTodos = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/show/todos');
            setTask(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const addTodo = async (e) => {
        // e.preventDefault();
        try {
            const res = await axios.post('http://localhost:9000/api/create/task', {
                taskTitle,
                taskDescription
            });
            if (res.data.success) {
                setTaskTitle('');
                setTaskDescription('');
                showTodos();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTodo = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:9000/api/delete/todo/${id}`);
       showTodos();
       console.log(response)

    }catch(err){
        console.log(err);
    }
      } 

    const showSingleTodo = async (id) => {
        try{
            const response = await axios.get(`http://localhost:9000/api/show/todos/${id}`);
            console.log(response);
            setTaskTitle(response.task);
            setTaskDescription(response.description);
            setEditMode(true);
        } catch (err) {
            console.log(err);
        }
    }

    const editTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:9000/api/update/todo/${taskId}`, {
                taskTitle,
                taskDescription,
                
            });
                setTaskTitle('');
                setTaskDescription('');
                setEditMode(false);
                showTodos();
            
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add New Task</h5>
                            <form onSubmit={editMode ? editTodo : addTodo}>
                                <div className="form-group">
                                    <label htmlFor="taskTitle">Task Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="taskTitle"
                                        placeholder="Enter task title"
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        value={taskTitle}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskDescription">Task Description</label>
                                    <textarea
                                        className="form-control"
                                        id="taskDescription"
                                        rows="3"
                                        placeholder="Enter task description"
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        value={taskDescription}
                                    ></textarea>
                                </div>
                                {
                                    editMode ?
                                        <button className="btn btn-success btn-sm mr-2 mt-3">
                                            Edit
                                        </button>

                                        :
                                        <button className="btn btn-success btn-sm mr-2 mt-3">
                                            + Add
                                        </button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h5 className="mb-3">Task List</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                task && task.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.task}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button onClick = {()=> showSingleTodo(index)}className="btn btn-primary btn-sm mr-2">
                                                Edit
                                            </button>
                                            <button onClick ={()=> deleteTodo(index)} className="btn btn-danger btn-sm ml-3">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
