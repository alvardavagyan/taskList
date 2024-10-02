import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getAllTasks } from "./task.slice"
import styles from "./task.module.css"
import { useNavigate } from "react-router-dom"

export const Tasks = () => {

    const list = useAppSelector(state => state.list)
    const [filter, setFilter] = useState<"all" | "Pending" | "Completed" | "In-progress">("all")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllTasks())
    }, [])

    const filteredTasks = filter === "all"
        ? list
        :
        list.filter(task => task.status === filter)

    const allTasks = filteredTasks.length
    const pendingTasks = filteredTasks.filter(task => task.status === 'Pending').length;
    const inProgressTasks = filteredTasks.filter(task => task.status === 'In-progress').length;
    const completedTasks = filteredTasks.filter(task => task.status === 'Completed').length;

    return <>

        <button className={styles.btn1} onClick={() => navigate(`/add-task/`)}>Add Task</button>
        <select value={filter} onChange={e => setFilter(e.target.value as "all" | "Pending" | "Completed" | "In-progress")}>
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In-progress">In-progress</option>
        </select>
        <div className={styles.statistics}>
            <h3>Statistics:</h3>
            <p>Pending: {pendingTasks}/{allTasks}</p>
            <p>Completed: {completedTasks}/{allTasks}</p>
            <p>In-progress: {inProgressTasks}/{allTasks}</p>
        </div>


        <h3 >TaskList:{filteredTasks.length} </h3>
        <div className={styles.list} >

            {
                filteredTasks.map(task =>
                    <div key={task.id} className={styles.statistics}>
                        <p>{task.text}</p>
                        {
                            task.status == "In-progress" ?
                                <select>
                                    <option>{task.status}</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                :
                                task.status == "Completed" ?
                                    <select>
                                        <option>{task.status}</option>
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                    </select>
                                    :
                                    <select>
                                        <option>{task.status}</option>
                                        <option value="completed">Completed</option>
                                        <option value="in-progress">In Progress</option>
                                    </select>
                        }
                        <p>{task.date}</p>
                        <button className={styles.btn1} onClick={() => navigate(`/update-task/${task.id}`)}>Edit Task</button>
                    </div>
                )
            }
        </div>

    </>
}