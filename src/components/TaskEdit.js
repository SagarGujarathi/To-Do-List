import { useState } from 'react'
import '../css/TaskEdit.css'
function TaskEdit({ sendData, index, setEditMode }) {
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const [tags, setTags] = useState('')
    function createTask() {
        if (task != '' && date != '' && tags != '') {
            setTimeout(() => {
                sendData({
                    id: Math.ceil(Math.random() * 10000),
                    taskName: task,
                    startDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
                    endDate: `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`,
                    comments: [],
                    files: [],
                    tags: tags.split(' '),
                }, index)
                setEditMode(0)
            }, 200)
        }
    }
    return (
        <>
            <div className="blur-screen" onClick={() => { setEditMode(0) }}></div>
            <div className="edit-popup">
                <span>
                    Enter your new task name :
                    <input type="text" onChange={e => setTask(e.target.value)} />
                </span>
                <span>
                    Deadline :
                    <input type="date" onChange={e => {
                        setDate(e.target.value)
                    }} />
                </span>
                <span>
                    Task Tags :
                    <input type="text" onChange={e => setTags(e.target.value)} />
                </span>

                <button className="ok-button" onClick={() => createTask()}>Ok</button>
            </div >
        </>
    )
}

export default TaskEdit