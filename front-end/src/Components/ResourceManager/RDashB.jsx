import React, { useState, useEffect } from 'react';
import RmDashboard from './RmDashboard';
import './RDashB.css';
import { URL } from '../../data';

const RDashB = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [reqestCount, setRequestCount] = useState(0);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchEmployeeCount = async () => {
            try {
                // const response = await fetch(`${URL}/employee-count`);
                const response=await fetch(`http://demo.darwinboxlocal.com/employee/countemployees`)
                if (!response.ok) {
                    throw new Error('Failed to fetch employee count');
                }
                const data = await response.json();
                setEmployeeCount(data.count);
            } catch (error) {
                console.error('Error fetching employee count:', error);
            }
        };

        const fetchProjectCount = async () => {
            try {
                // const response = await fetch(`${URL}/project-count`);
                const response=await fetch(`http://demo.darwinboxlocal.com/project/projectcount`)
                if (!response.ok) {
                    throw new Error('Failed to fetch project count');
                }
                const data = await response.json();
                setProjectCount(data.count);
            } catch (error) {
                console.error('Error fetching project count:', error);
            }
        };

        const fetchRequestCount = async () => {
            try {
                // const response = await fetch(`${URL}/request-count`);
                const response=await fetch(`http://demo.darwinboxlocal.com/projectRequest/getrequestcount`)
                if (!response.ok) {
                    throw new Error('Failed to fetch request count');
                }
                const data = await response.json();
                setRequestCount(data.count);
            } catch (error) {
                console.error('Error fetching request count:', error);
            }
        };

        const fetchProjects = async () => {
            try {
                // const response = await fetch(`${URL}/Project-data`);
                const response=await fetch(`http://demo.darwinboxlocal.com/project/displayprojects`)
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                console.log('Fetched projects:', data); // Debugging line
                // setProjects(data);
                if (data.projects && Array.isArray(data.projects)) {
                    setProjects(data.projects);
                } else {
                    console.error('Invalid projects data format:', data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchEmployeeCount();
        fetchProjectCount();
        fetchRequestCount();
        fetchProjects();
    }, []);

    const splitDateByT = (date) => {
        if (date) {
            const dateObj = new Date(date);
            // if (!isNaN(dateObj)) {
                return dateObj.toISOString().split('T')[0];
            // }
        }
        // return 'N/A';
    };

    return (
        <React.Fragment>
            <RmDashboard />

            <div className='dashboard-container '>
                <div className='dash'>
                    <div className="box1">
                        <h4>Employee Count</h4>
                        <p>{employeeCount}</p>
                    </div>
                    <div className="box2">
                        <h4>Project Count</h4>
                        <p>{projectCount}</p>
                    </div>
                    <div className="box1">
                        <h4>Request Count</h4>
                        <p>{reqestCount}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="table-container">
                    <table className="project-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Department</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.projectId}>
                                    <td>{project.title}</td>
                                    <td>{splitDateByT(project.startDate)}</td>
                                    <td>{splitDateByT(project.endDate)}</td>
                                    <td>{project.department}</td>
                                    <td>{project.description}</td>
                                    <td>{project.referredEmployees && project.referredEmployees.length > 0 ? "Referred" : "Not Referred"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RDashB;
