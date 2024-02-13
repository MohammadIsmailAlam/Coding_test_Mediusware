import React, { useState } from 'react';

const Problem1 = () => {
    const [show, setShow] = useState('all');
    const [name, setName] = useState(null);
    const [status, setStatus] = useState(null);
    const [statusData, setStatusData] = useState([]);

    const handleClick = (val) => {
        setShow(val);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newData = { name, status };
        setStatusData([...statusData, newData]);
    };

    // Sorting function based on status
    const sortDataByStatus = (data) => {
        let sortOrder = 1;
        if (show === 'completed') sortOrder = -1;
        return data.sort((a, b) => {
            if (a.status < b.status) return -1 * sortOrder;
            if (a.status > b.status) return 1 * sortOrder;
            return 0;
        });
    };

    // Filter and sort tasks based on the show state
    const filteredAndSortedTasks = sortDataByStatus(
        statusData.filter((task) => {
            if (show === 'all') return true;
            if (show === 'active') return task.status === 'Active';
            if (show === 'completed') return task.status === 'Completed'; // Filter completed tasks
            return false; // Default case
        })
    );

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" onChange={(e) => setStatus(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>
                                All
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>
                                Active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>
                                Completed
                            </button>
                        </li>
                    </ul>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
