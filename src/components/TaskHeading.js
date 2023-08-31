import { Draggable } from "react-beautiful-dnd"
import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import '../css/TaskHeading.css'
import HeadingEdit from "./HeadingEdit"
function TaskHeading({ task, index, changeTaskHeadingName, deleteTaskHeading }) {
    const [vis, setVis] = useState(0)
    const [menu, setMenu] = useState(0)
    const [editMode, setEditMode] = useState(0)
    const settingRef = useRef()
    const dropDownRef = useRef()
    window.addEventListener('click', (e) => {
        if (e.target != settingRef.current && e.target != dropDownRef.current) {
            setMenu(0)
        }
    })
    return (
        <Draggable draggableId={`${task.id}`} index={index} key={`${task.id}`}>
            {
                (provided) => {
                    return <>
                        <div
                            className="task-heading"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            onMouseOver={() => setVis(1)}
                            onMouseLeave={() => setVis(0)}
                        >
                            <div className="task-name" >
                                <span>
                                    {task.taskName}
                                    &nbsp;
                                    &nbsp;
                                    <span>({task.taskItems.length})</span>
                                </span>
                            </div>
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                className='heading-more-setting'
                                style={{ opacity: `${vis}` }}
                                onClick={() => setMenu(!menu)}
                                ref={settingRef}
                            />

                            {
                                menu ? <div className="options-dropdown" ref={dropDownRef}>
                                    <div className="edit-option" onClick={() => setEditMode(!editMode)}>
                                        <FontAwesomeIcon icon={faPencil} />
                                        Edit
                                    </div>
                                    <div className="delete-option" onClick={() => deleteTaskHeading(task.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        Delete
                                    </div>
                                </div> : ''
                            }
                        </div>
                        {
                            editMode ?
                                <>
                                    <HeadingEdit index={task.id} changeTaskHeadingName={changeTaskHeadingName} setEditMode={setEditMode} />
                                </> : ''
                        }
                    </>
                }
            }
        </Draggable >
    )
}

export default TaskHeading