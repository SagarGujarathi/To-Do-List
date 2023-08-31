import { useState } from 'react'

function HeadingEdit({ createProject, setEditMode }) {
    const [task, setTask] = useState('')
    return (
        <>
            <div className="blur-screen" onClick={() => { setEditMode(0) }} style={{ fontFamily: 'Lato, sans-serif' }}></div >
            <div className="edit-popup">
                <span>
                    Enter your Project name :
                    <input type="text" onChange={e => setTask(e.target.value)} />
                </span>
                <button className="ok-button" onClick={() => {
                    if (task != '') {
                        createProject(task)
                        setEditMode(0)
                    }
                }}>Ok</button>
            </div >
        </>
    )
}

export default HeadingEdit