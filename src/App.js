import SearchBar from "./components/SearchBar"
import NewProject from "./components/NewProject"
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import Sidebar from "./components/Sidebar";
import { Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [taskData, setData] = useState([])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('taskData'))
    if (data != null) {
      setData(data)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('taskData', JSON.stringify(taskData))
  }, [taskData])
  const [sidebar, setSidebar] = useState(false)
  function handleTaskDnD({ source, destination }) {
    setData(oldData => {
      let dataClone = [...oldData]
      let removedData;
      dataClone.forEach((project, index1) => {
        project.taskDivider.forEach((container, index2) => {
          if (container.id == source.droppableId) {
            removedData = container.taskItems[source.index]
            dataClone[index1].taskDivider[index2].taskItems.splice(source.index, 1)
          }
        })
      })
      dataClone.forEach((project, index1) => {
        project.taskDivider.forEach((container, index2) => {
          if (container.id == destination.droppableId) {
            dataClone[index1].taskDivider[index2].taskItems.splice(destination.index, 0, removedData)
          }
        })
      })
      return dataClone
    })
  }

  function handleHeadingDnD({ source, destination }) {
    setData(oldData => {
      let dataClone = [...oldData]
      let removedData;
      dataClone.forEach((project, index) => {
        if (project.id == source.droppableId) {
          removedData = project.taskDivider[source.index]
          project.taskDivider.splice(source.index, 1)
        }
      })
      dataClone.forEach((project, index) => {
        if (project.id == source.droppableId) {
          project.taskDivider.splice(destination.index, 0, removedData)
        }
      })
      return dataClone
    })

  }
  function handleEvent({ source, destination, type, draggableId }) {
    if (!destination) {
      return;
    }

    switch (type) {
      case 'task-group':
        handleTaskDnD({ source, destination, type, draggableId })
      case 'heading':
        handleHeadingDnD({ source, destination, type, draggableId })
    }
  }

  function changeTaskHeadingName(name, id) {
    setData(oldData => {
      let dataClone = [...oldData]
      dataClone.forEach((project) => {
        project.taskDivider.forEach((container) => {
          if (container.id == id) {
            container.taskName = name;
          }
        })
      })
      return dataClone
    })

  }
  function createTaskHeading(name, id) {
    setData(oldData => {
      let dataClone = [...oldData]
      dataClone.forEach((project) => {
        if (project.id == id) {
          project.taskDivider.push({
            id: Math.ceil(Math.random() * 10000),
            taskName: name,
            taskItems: []
          })
        }
      })
      return dataClone
    })
  }
  function deleteTaskItem(id) {
    setData(oldData => {
      let dataClone = [...oldData]
      dataClone.forEach((project) => {
        project.taskDivider.forEach((container) => {
          container.taskItems.forEach((task, index) => {
            if (task.id == id) {
              container.taskItems.splice(index, 1)
            }
          })
        })
      })
      return dataClone
    })
  }
  function deleteTaskHeading(id) {
    setData(oldData => {
      let dataClone = [...oldData]
      dataClone.forEach((project) => {
        project.taskDivider.forEach((container, index) => {
          if (container.id == id) {
            project.taskDivider.splice(index, 1)
          }
        })
      })
      return dataClone
    })
  }
  function editTask(data, id) {
    setData(oldData => {
      let dataClone = [...oldData]
      dataClone.forEach((project, index1) => {
        project.taskDivider.forEach((container, index2) => {
          container.taskItems.forEach((task, index) => {
            if (task.id == id) {
              container.taskItems[index] = data
            }
          })
        })
      })
      return dataClone
    })
  }
  function createTask(data, id) {
    setData(oldData => {
      let dataClone = [...oldData]
      dataClone.forEach((project) => {
        project.taskDivider.forEach((container, index) => {
          if (container.id == id) {
            project.taskDivider[index].taskItems.push(data)
          }
        })
      })
      return dataClone
    })
  }
  function createProject(name) {
    setData(oldData => {
      let dataClone = [...oldData, {
        id: Math.ceil(Math.random() * 10000),
        projectName: name,
        taskDivider: []
      }]
      return dataClone
    })
  }
  function deleteProject(name) {
    setData(oldData => {
      let dataClone = [...oldData]
      dataClone = dataClone.filter((project) => project.projectName != name)
      return dataClone
    })
  }
  return (
    <DragDropContext onDragEnd={(result) => {
      handleEvent(result)
    }}>
      <div className="main-container">
        <SearchBar setSidebar={setSidebar} />
        <Routes>
          {
            taskData.map((project, index) => {
              return (
                <Route path={`/${project.projectName}/${project.id}`} element={
                  <NewProject data={project}
                    changeTaskHeadingName={changeTaskHeadingName}
                    createTaskHeading={createTaskHeading}
                    deleteTaskItem={deleteTaskItem}
                    deleteTaskHeading={deleteTaskHeading}
                    editTask={editTask}
                    createTask={createTask}
                    deleteProject={deleteProject}
                  />
                } />
              )
            })
          }
          <Route path="/" element={
            <>
              <div className="error-page">
                Welcome!
                <span>
                  Click on &nbsp; <FontAwesomeIcon icon={faBars} /> &nbsp;to create project
                </span>
              </div>
            </>
          } />
          <Route path="*" element={
            <>
              <div className="error-page">
                Page not found!
              </div>
            </>
          } />
        </Routes>
      </div>
      {
        sidebar ? <Sidebar closeSidebar={setSidebar} data={taskData} createProject={createProject} /> : ''
      }
    </DragDropContext >
  )
}
export default App