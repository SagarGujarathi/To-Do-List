import { useState } from 'react'

function HeadingEdit({ index, changeTaskHeadingName, setEditMode }) {
    const [task, setTask] = useState('')
    return (
        <>
            <div className="blur-screen" onClick={() => { setEditMode(0) }}></div>
            <div className="edit-popup">
                <span>
                    Enter your task status :
                    <input type="text" onChange={e => setTask(e.target.value)} />
                </span>
                <button className="ok-button" onClick={() => {
                    if (task != '') {
                        changeTaskHeadingName(task, index)
                        setEditMode(0)
                    }
                }}>Ok</button>
            </div >
        </>
    )
}

export default HeadingEdit