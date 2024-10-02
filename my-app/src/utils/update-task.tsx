import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteTask, updateTask } from "../features/tasks/task.slice";
import styles from "../features/tasks/task.module.css"


export const UpdateTask = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const task = useAppSelector(state => state.list.find(t => t.id === id))
    const [taskText, setTaskText] = useState("")
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (task) {
            setTaskText(task.text)
            setStatus(task.status)
            setDate(task.date)
        }
    }, [task])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (task) {
            dispatch(updateTask({ ...task, text: taskText, status }))
            navigate("/")
        } else {
            navigate("/")
        }
    }

    return (
        task &&
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.h3}>Update Task</h3>
            <input
                className={styles.input}
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                required
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Completed">Completed</option>
                <option value="In-progress">In-Progress</option>
                <option value="Pending">Pending</option>
            </select>
            <input
                className={styles.input}
                type="number"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit" className={styles.btn1}>Save</button>
            <button className={styles.btn2} onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
        </form>
    );
};

