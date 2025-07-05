import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      axios
        .get("http://localhost:3000/logs/log", {
          params: { level: searchTerm },
        })
        .then((res) => setLogs(res.data))
        .catch((err) => console.error(err));
    }, 400); // debounce delay: 400ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    const graphqlQuery = {
      query: `
          query {
            getUsers {
              id
              firstName
              lastName
              email            
              address
              city
              hireDate
              phone
            }
          }
        `
    };

    try {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery)
      });

      const resData = await response.json();
      if (resData.errors) throw new Error(resData.errors[0].message);
      setEmployees(resData.data.getUsers);
    } catch (err) {
      console.error(err);
      setError('Failed to load employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#131712] dark group/design-root overflow-x-hidden"
    >
      <div className="layout-container flex h-full grow flex-col">

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Employee Data</p>
              <Link to="/add"
                class="flex min-w-[84px] max-w-[480px] mt-3 cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#2d372a] text-white text-sm font-medium leading-normal"
              >
                <span class="truncate">Add Employee</span>
              </Link>
              </div>
           
            <div className="px-2 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#42513e] bg-[#131712]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#1f251d]">
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">ID</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Name</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Email</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-680 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">City</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-720 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Phone</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-720 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Address</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-720 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">City</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-1080 px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-c1276663-b4a1-4991-9003-e540c3baf93f-column-1200 px-4 py-3 text-left text-white w-60 text-[#a5b6a0] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp, index) => (
                      <tr key={emp.id || index} className="border-t border-t-[#42513e]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal">{index + 1}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal">{`${emp.firstName} ${emp.lastName}`}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal">{emp.email}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal">{emp.city || '—'}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal">{emp.phone || '—'}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal">{emp.address}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal">{emp.city}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal">{emp.address}</td>
                        {/* <td className="h-[72px] px-4 py-2 w-60 text-[#a5b6a0] text-sm font-bold tracking-[0.015em]">
                          View
                        </td> */}
                        <td className="h-[72px] px-4 py-2 w-60 text-[#a5b6a0] text-sm font-bold tracking-[0.015em]">
                          <Link
                            to={`/${emp.id}`}
                            className="text-blue-400 hover:underline"
                          >
                            View
                          </Link>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

