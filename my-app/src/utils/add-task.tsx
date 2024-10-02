import { useAppDispatch } from "../app/hooks"
import { addTask } from "../features/tasks/task.slice"
import styles from "../features/tasks/task.module.css"
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import type { InputTask } from "../features/tasks/types"

export const AddTask = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm<InputTask>()

    const handleAdd: SubmitHandler<InputTask> = (task) => {
        dispatch(addTask(task))
        navigate("/")
        reset()
    }
    return <>

        <form className={styles.form} onSubmit={handleSubmit(handleAdd)}>
            <h4>Add Task</h4>
            <input
                className={styles.input}
                type="text"
                placeholder="text"
                {...register("text", { required: true })}
            />
            <br />
            <select  {...register("status", { required: true })}>
                <option value="Pending">Pending</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>

            </select>
            <br />
            <input
                className={styles.input}
                type="number"
                placeholder="date"
                {...register("date", { required: true })}
            />
            <br />
            <button className={styles.btn1}>add</button>
        </form>
    </>
}