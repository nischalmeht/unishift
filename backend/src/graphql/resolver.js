const User = require('../models/userModel');
const Department = require('../models/departmentModel');

const resolvers = {
//   createEmployee: async ({ firstName, lastName, email, phone, address, city, departmentId }) => {
//     try {
//       // Optional: check if department exists
//       if (departmentId) {
//         const deptExists = await Department.findById(departmentId);
//         if (!deptExists) throw new Error('Department not found');
//       }

//       const newUser = new User({
//         firstName,
//         lastName,
//         email,
//         phone,
//         address,
//         city,
//         department: departmentId || null,
//       });

//       const savedUser = await newUser.save();

//       return {
//         ...savedUser._doc,
//         id: savedUser._id.toString(),
//       };
//     } catch (error) {
//         console.log(error,'err')
//       throw new Error('Error creating user: ' + error.message);
//     }
//   },
createEmployee: async ({ input }) => {
    try {
      const {
        firstName, lastName, email, phone, address,
        city, state, zip, dob, hireDate, departmentId, 
      } = input;
  
    //   if (departmentId) {
    //     const deptExists = await Department.findById(departmentId);
    //     if (!deptExists) throw new Error('Department not found');
    //   }
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        dob,
        hireDate,
        department: departmentId || null,
      });
  
      const savedUser = await newUser.save();
  
      return {
        ...savedUser._doc,
        id: savedUser._id.toString(),
      };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },
  

  getUsers: async () => {
    const users = await User.find().populate('department');
    return users.map(user => ({
      ...user._doc,
      id: user._id.toString(),
    }));
  },

  getUserById: async ({ id }) => {
    const user = await User.findById(id).populate('department');
    if (!user) throw new Error('User not found');
    return {
      ...user._doc,
      id: user._id.toString(),
    };
  },
};

module.exports = resolvers;
