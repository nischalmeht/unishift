import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeesUser = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      const graphqlQuery = {
        query: `
          query GetUserById($id: ID!) {
            getUserById(id: $id) {
              id
              firstName
              lastName
              email
              phone              
              dob
              hireDate
              address
              city
              state
            }
          }
        `,
        variables: { id }
      };

      try {
        const response = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(graphqlQuery),
        });

        const resData = await response.json();

        if (resData.errors) {
          throw new Error(resData.errors[0].message);
        }

        setEmp(resData.data.getUserById);
      } catch (err) {
        console.error(err);
        setError("Employee not found");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error || !emp) return <div className="text-white p-6">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#131712] text-white font-['Manrope','Noto Sans',sans-serif]">
      <header className="flex justify-between items-center px-10 py-3 border-b border-[#2d372a]">
        <h2 className="text-lg font-bold">Employee Profile</h2>
        <div className="rounded-full size-10 bg-[#2d372a] text-sm flex items-center justify-center">
          {emp.firstName[0]}
        </div>
      </header>

      <div className="max-w-[960px] mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold">{emp.firstName} {emp.lastName}</h1>
        <p className="text-[#a5b6a0] mb-4">Department: {emp.lastName}</p>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p>Email: {emp.email}</p>
          <p>Phone: {emp.phone}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Personal</h3>
          <p>DOB: {emp.dob?.split("T")[0]}</p>
          <p>Hire Date: {emp.hireDate?.split("T")[0]}</p>
          <p>Address: {emp.address}, {emp.city}, {emp.state}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeesUser;
