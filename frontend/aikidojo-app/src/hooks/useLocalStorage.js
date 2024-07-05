import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole, setUserRole as updateUserRole } from "../utils/authToken";
import { getToken } from "../utils/authToken";
import { getUserId, setUserId } from "../utils/authToken";

import { getApiResource } from "../utils/network";

import { API_URL } from "../constants/api";

export const useLocalStorage = (role) => {
    const [userRole, setUserRole] = useState(getUserRole());
    const navigate = useNavigate();

    useEffect(() => {
        if (!userRole) {
            navigate('/login')
        }
        
        
    }, [userRole]);



    // useEffect(() => {
    //     // if (!userRole) {

    //     // }
    //         console.log('navigation effect')
        
    //         console.log(userRole)
        
    //         if (!userRole) {
    //           navigate('/login');
              
    //         } else {
    //           if (userRole === 'trainer') {
    //             navigate('/trainer');
    //           } else if (userRole === 'student') {
    //             navigate('/student');
    //           } 
    //         }
        
    //       }, [userRole]);
}


// useEffect(() => {
//     const fetchUserRole = async () => {
//       const res = await getApiResource(API_URL + "me", {
//         headers: {
//           Authorization: `Token ${getToken()}`,
//         },
//       });

//       if (res) {
//         const user = res;
//         console.log(user);
//         updateUserRole(user.role);
//         setUserId(user.id);
//         console.log(user.id)
//         console.log(getUserId())


//         if (!userRole) {
//             navigate('/login');
            
//           } else {
//             if (userRole === 'trainer') {
//               navigate('/trainer');
//             } else if (userRole === 'student') {
//               navigate('/student');
//             } 
//           }
//         // setUserId(user.id);
//         // console.log(getUserId())
//         // console.log('63', user.role);
//         // navigate('/trainer')
//       } else {
//         console.log("No user data");
//       }
//     };

//     if (getToken()) {
//       // request role
//       fetchUserRole();
      
//     } else {
//       console.log(95);
//       navigate('/login')
//     }
//   }, [userRole]);


//   useEffect(() => {
//     console.log('navigation effect')

//     console.log(userRole)

//     if (!userRole) {
//       navigate('/login');
      
//     } else {
//       if (userRole === 'trainer') {
//         navigate('/trainer');
//       } else if (userRole === 'student') {
//         navigate('/student');
//       } 
//     }

//   }, [userRole]);
