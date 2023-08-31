
import '../css/TaskItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faCalendarDays, faHourglassEnd, faLink, faEllipsis, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd'
import { useState, useRef, useEffect } from 'react'
import TaskEdit from './TaskEdit'
function TaskItem({ data, index, deleteTaskItem, editTask }) {
    const [vis, setVis] = useState(0)
    const [menu, setMenu] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [tags, setTags] = useState('')
    const settingRef = useRef()
    const dropDownRef = useRef()
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (e.target !== settingRef.current && e.target !== dropDownRef.current) {
                setMenu(false)
            }
        })
    }, [])
    const colors = ['#F7EDC2', '#D7E0FC', '#FFD5CF']
    useEffect(() => {
        setTags(data.tags.map((tag) => {
            return <div className="tag-item" style={{ backgroundColor: `${colors[Math.floor(Math.random() * 3)]}` }}>
                {tag}
            </div>
        }))
    }, [data.tags])
    return (
        <>
            <Draggable draggableId={`${data.id}`} key={`${data.id}`} index={index}>
                {(provided) => {
                    return (
                        <div
                            className="task-item"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            onMouseOver={() => setVis(1)}
                            onMouseLeave={() => setVis(0)}
                        >
                            <div className="task-item-wrapper">
                                <div className="task-item-heading">{data.taskName}</div>
                                <div className="info-container">
                                    <span className="file-container">
                                        <FontAwesomeIcon icon={faLink} />
                                        {data.files.length}
                                    </span>
                                    <span className="chat-container">
                                        <FontAwesomeIcon icon={faMessage} />
                                        {data.chatCount}
                                    </span>
                                    <span className="date-container">
                                        <span>
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            {data.startDate}
                                        </span>
                                        <span>
                                            <FontAwesomeIcon icon={faHourglassEnd} />
                                            {data.endDate}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="tag-container">
                                {tags}
                            </div>
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                className='task-more-setting'
                                style={{ opacity: `${vis}` }}
                                ref={settingRef}
                                onClick={() => setMenu(!menu)}
                            />
                            {
                                menu ? <div className="task-options-dropdown" ref={dropDownRef}>
                                    <div className="edit-option" onClick={() => setEditMode(true)}>
                                        <FontAwesomeIcon icon={faPencil} />
                                        Edit
                                    </div>
                                    <div className="delete-option" onClick={() => { deleteTaskItem(data.id) }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        Delete
                                    </div>
                                </div> : ''
                            }
                        </div >
                    )
                }}
            </Draggable >
            {
                editMode ?
                    <>
                        <TaskEdit sendData={editTask} index={data.id} setEditMode={setEditMode} />
                    </> : ''
            }
        </>)
}

export default TaskItem