import '../css/MainInfoBar.css'
function MainInfoBar({ projectName, deleteProject }) {
    return (
        <div className="main-info-bar">
            <div className="repo-name">
                {projectName}
            </div>
            <div className="task-nav-bar">
                <div className="links">
                    <a href="#">Board</a>
                    <a href="#">Details</a>
                    <a href="#" className='delete-project' onClick={() => deleteProject(projectName)}>Delete</a>
                </div>
            </div>
        </div>
    )
}

export default MainInfoBar