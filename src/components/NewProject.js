import MainInfoBar from './MainInfoBar'
import TaskContainer from './TaskContainer'
import '../css/NewProject.css'
import { Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import TaskHeading from './TaskHeading'
import HeadingEdit from './HeadingEdit'
function NewProject({ data, changeTaskHeadingName, createTaskHeading, deleteTaskItem, deleteTaskHeading, editTask, createTask, deleteProject }) {
    const [createMode, setCreateMode] = useState(0)
    return <>
        <MainInfoBar projectName={data.projectName} deleteProject={deleteProject} />
        <div className="primary-task-container">
            <Droppable
                droppableId={`${data.id}`}
                direction='horizontal'
                type='heading'
            >
                {(provided) => {
                    return (
                        <>
                            <div className="heading-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {data.taskDivider.map((task, index) => {
                                    return (
                                        <TaskHeading task={task} index={index} changeTaskHeadingName={changeTaskHeadingName} deleteTaskHeading={deleteTaskHeading} />
                                    )
                                })}
                                <div className="add-heading">
                                    <FontAwesomeIcon icon={faPlus} onClick={() => { setCreateMode(1) }} />
                                </div>
                            </div>
                            {createMode ? <>
                                <HeadingEdit setEditMode={setCreateMode} index={data.id} changeTaskHeadingName={createTaskHeading} />
                            </> : ''
                            }
                        </>
                    )
                }}
            </Droppable >
            <div className="main-task-container">
                {
                    data.taskDivider.map((task) => {
                        return (
                            <TaskContainer data={task} deleteTaskItem={deleteTaskItem} editTask={editTask} createTask={createTask} />
                        )
                    })
                }
            </div>
        </div>
    </>
}

export default NewProject