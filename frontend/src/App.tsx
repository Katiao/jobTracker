import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
  Landing,
  Error,
  Register,
  HomeLayout,
  Login,
  DashboardLayout,
  AddJob,
  Stats,
  AllJobs,
  Profile,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          // {
          //   path: 'admin',
          //   element: <Admin />,
          // },
          // {
          //   path: 'edit-job/:id',
          //   element: <EditJob />,
          // },
          // { path: 'delete-job/:id', action: deleteJobAction(queryClient) },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

// export const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Nested routes for Dashboard/ SharedLayout*/}
//         {/* Restrict access - only users can access nested routes */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <SharedLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Stats />} />
//           <Route path="all-jobs" element={<AllJobs />} />
//           <Route path="add-job" element={<AddJob />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//         ‚
//         <Route path="landing" element={<Landing />} />
//         <Route path="register" element={<Register />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//       <ToastContainer />
//     </BrowserRouter>
//   );
// };

export default App;
