import React, { useState } from 'react';

const Employees = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    hireDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const graphqlQuery = {
      query: `
        mutation CreateEmployee($input: EmployeeInput!) {
          createEmployee(input: $input) {
            id
            firstName
            lastName
            email
          }
        }
      `,
      variables: {
        input: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          departmentId: formData.department, // should be department ID
          zip: formData.zip,
          dob: formData.dob,
          hireDate: formData.hireDate,
        },
      },
    };

    try {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      });

      const resData = await response.json();

      if (resData.errors) {
        throw new Error(resData.errors[0].message || 'Failed to create employee');
      }

      alert('Employee Created: ' + resData.data.createEmployee.firstName);
      setFormData({
        firstName: '',
        lastName: '',
        department: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        dob: '',
        hireDate: '',
      });
    } catch (err) {
      console.error(err);
      alert('Error creating employee: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white text-[32px] font-bold">Add Employee</p>
          </div>

          <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />

          <div className="flex max-w-[1080px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Department</p>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#434f40] bg-[#1f241e] focus:border-[#434f40] h-14 placeholder:text-[#a6b3a2] p-[15px] text-base font-normal leading-normal"
              >
                <option value="">Select department</option>
                <option value="depId1">HR</option>
                <option value="depId2">Engineering</option>
                <option value="depId3">Sales</option>
              </select>
            </label>
          </div>

          <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} />
          <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} />
          <FormInput label="City" name="city" value={formData.city} onChange={handleChange} />
          <FormInput label="State" name="state" value={formData.state} onChange={handleChange} />
          <FormInput label="Zip Code" name="zip" value={formData.zip} onChange={handleChange} />

          <FormInput label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
          <FormInput label="Hire Date" name="hireDate" value={formData.hireDate} onChange={handleChange} type="date" />

          <div className="flex px-4 py-3 justify-center">
            <button type="submit" className="rounded-full bg-[#8cd279] text-[#131612] px-4 h-10 font-bold">
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const FormInput = ({ label, name, value, onChange, placeholder = '', type = 'text' }) => (
  <div className="form-group px-4 py-3">
    <label className="text-white font-medium pb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      className="form-input w-full h-14 bg-[#1f241e] border border-[#434f40] text-white p-3 rounded-xl placeholder:text-[#a6b3a2]"
    />
  </div>
);

export default Employees;
