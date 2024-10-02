import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Tasks } from "./features/tasks/tasks";
import { AddTask } from "./utils/add-task";
import { UpdateTask } from "./utils/update-task";
 
export default function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/update-task/:id" element={<UpdateTask />} /> 
            </Routes>
        </Router>
    )
}


