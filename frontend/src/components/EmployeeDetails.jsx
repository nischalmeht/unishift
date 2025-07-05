import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeDetails = () => {
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
        <div className="min-h-screen bg-[#131712] text-white p-10">
            <h2 className="text-3xl font-bold mb-6">Employees</h2>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4">
                {employees.map((emp) => (
                    <Link
                        to={`/${emp.id}`}
                        key={emp.id}
                        className="p-4 bg-[#1f241e] rounded-xl hover:-translate-y-2 transition-all"
                    >
                        <div
                            className="aspect-square w-full bg-cover bg-center rounded-lg mb-3"
                            style={{ backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuCCbSpCXCegXtKzsc6pc7HQ4ah3G3k_ibjLtSGCTDzrxeuHDwh36zE_kncPY-VbQkg41Q-KHa_FUMFK2uSXjy7AMXz34qAzZ8GWPsvvcev-PaaxxApOzOfIrgbuQVeLFDo8kXYujrjds-uqZfg4Z6dGfzHzcc-I2NHyB8SS-rk3-PijwvPpRO61HvrBc7e7kjfEFp6LAIqtllqv59Jfs6egpPB-yEqO8As_-_FxIQZDe5QujRdmAQ8myYGC-XPk2wGTz-cAe0U0EYg9)` }}
                        ></div>
                        <p className="text-lg font-semibold">
                            {emp.firstName} {emp.lastName}
                        </p>
                        <p className="text-sm text-gray-400">Email: {emp.email}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EmployeeDetails;
