import '../css/Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiagramProject, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRef, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ProjectEdit from '../components/ProjectEdit'
function Sidebar({ closeSidebar, data, createProject }) {
    const [createrMode, setCreateMode] = useState(false)
    const blurScreenRef = useRef()
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (blurScreenRef.current === e.target) {
                closeSidebar(0)
            }
        })
    })
    return <>
        <div className="blur-screen" ref={blurScreenRef}></div>
        <div className="sidebar-main-container">
            <div className="sidebar-item">
                <div className="list-heading">PROJECTS</div>
                {
                    data.map((project) => {
                        return <>
                            <NavLink to={`/${project.projectName}/${project.id}`} >
                                {({ isActive }) => {
                                    return <div className="list-item" style={{ borderLeft: isActive ? '5px solid #F45050' : '', backgroundColor: isActive ? '#232B53' : '' }}>
                                        <FontAwesomeIcon icon={faDiagramProject} />
                                        {project.projectName}
                                    </div>
                                }}
                            </NavLink>
                        </>
                    })
                }
                <div className="add-project" onClick={() => setCreateMode(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add project...
                </div>
            </div >
        </div>
        {
            createrMode ?
                <ProjectEdit setEditMode={setCreateMode} createProject={createProject} /> : ''
        }
    </>
}

export default Sidebar