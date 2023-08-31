
import TaskItem from './TaskItem'
import '../css/taskContainer.css'
import { Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import TaskEdit from './TaskEdit'
function TaskContainer({ data, deleteTaskItem, editTask, createTask }) {
    const [createMode, setCreateMode] = useState(0)

    return (
        <Droppable droppableId={`${data.id}`} type='task-group'>
            {(provided) => {
                return (
                    <>
                        <div className="task-container" {...provided.droppableProps} ref={provided.innerRef}>
                            {data.taskItems.map((taskItem, index) => {
                                return (
                                    <TaskItem data={taskItem} index={index} deleteTaskItem={deleteTaskItem} editTask={editTask} />
                                )
                            })}
                            <div className="add-task" onClick={() => setCreateMode(!createMode)}>
                                <FontAwesomeIcon icon={faPlus} />
                                Add task...
                            </div>
                        </div>
                        {
                            createMode ?
                                <TaskEdit sendData={createTask} index={data.id} setEditMode={setCreateMode} />
                                : ''
                        }
                    </>
                )
            }}
        </Droppable >
    )
}

export default TaskContainer