import React, { useState, useEffect } from 'react';
import { URL } from '../../data';
import PmDashboard from './PmDashboard';
import PmNavbar from './PmNavbar';
import './SendRequest.css';


const SendRequest = () => {
  const [projectRequest, setProjectRequest] = useState(null);
  const [projects, setProjects] = useState([]);
  const fetchProjData = async () => {
    try {
      const response = await fetch(`${URL}Project-data`);
      if (!response.ok) {
        throw new Error('Failed to fetch project data');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };
  const fetchProjectData = async () => {
    try {
      const response = await fetch(`${URL}/api/send-request`);
      if (!response.ok) {
        throw new Error('Failed to fetch project data');
      }
      const data = await response.json();
      setProjectRequest(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetchProjData ();
  }, [projects]);

  const viewProjectPdf = async (projectId) => {

    try {
      window.open(`${URL}/Project-data/${projectId}/pdf`, '_blank');
    } catch (error) {
      console.error('Error viewing project PDF:', error);
    }
  };
  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`${URL}/send-request/${projectId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete request project');
      }
      // Remove the deleted project from the state
      setProjects(projects.filter(project => project._id !== projectId));
      console.log('Requested Project deleted successfully');
    } catch (error) {
      console.error('Error deleting requestend project:', error);
    }
  };
  const splitDateByT = (date) => {
    return date.split('T')[0];
};


  return (
    <React.Fragment>
      <PmDashboard />
      
      <div className="container">
        <h2>Request Sent</h2>
        <div className="project-container">
          {projectRequest && projectRequest.map((projectreq) => {
            const matchingProject = projects.find(project => project.title === projectreq.title);
            return matchingProject && (
              <div key={projectreq._id} className="project-box">
                <div className="project-details">
                  <h3>{projectreq.title}</h3>
                  <div className="view-pdf-button">
                    <button onClick={() => viewProjectPdf(matchingProject.projectId)}>View PDF</button>
                  </div>
                  <p><strong>Start Date:</strong> {splitDateByT(projectreq.startDate)}</p>
                  <p><strong>End Date:</strong> {splitDateByT(projectreq.endDate)}</p>
                  <p><strong>Department:</strong> {projectreq.department}</p>
                  <p><strong>Description:</strong> {projectreq.description}</p>
                </div>
                <div className="options">
                  <button className="btn btn-outline-success bb" onClick={() => handleDelete(projectreq._id)}>Delete</button><br></br>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SendRequest;


