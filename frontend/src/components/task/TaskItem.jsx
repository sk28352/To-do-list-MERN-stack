import React,{useState} from 'react';
import classes from './TaskItem.module.scss';
import toast from 'react-hot-toast';
import axios from 'axios';


function TaskItem({task,deleteTask}) {
    const [isCompleted,setIsCompleted] = useState(task.Completed);
    const [isLoading, setIsLoading]=useState(false);

    const handleCheckboxClick=async()=>{
        try{
            setIsLoading(true);
            await axios.put(`/api/tasks/${task._id}`,{
                completed: !isCompleted,
            });
            setIsCompleted(!isCompleted);
            toast.success('Task Updated Successfully');
        }catch(err){
            console.log(err);
        } finally{
            setIsLoading(false);
        }
    };
  return (
    <tr className={classes.task_item}>
        <td className={classes.task_name}>
            <div className={classes.checkbox} onChange={handleCheckboxClick}
            role="checkbox" aria-checked disabled={isLoading}>
                <input type="checkbox" checked={isCompleted} tabIndex={-1} readOnly disabled={isLoading} />
            </div>
            <p>{task.title}</p>
        </td>
        <td>{isCompleted?'Complete':'Incomplete'}</td>
        <td>
            <button className={classes.deleteBtn} type="button" onClick={()=>deleteTask(task._id)}>Delete</button>
        </td>
    </tr>
  );
}

export default TaskItem;