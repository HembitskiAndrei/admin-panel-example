import { Link } from 'react-router-dom'
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../login";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";

const AppRoutes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/lodin",
      element: <Login/>
    }  
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute auth={{
                    isAuthenticated: !!token
                }} />,
      children: [
        {
          path: "",
          element: <div>
            <p>User Home Page</p>
            <p><Link to="./albums">go to Albums</Link></p>
          </div>,
        },
        {
          path: "albums",
          element: <div>
            <p>Albums</p>
            <p><Link to="./create">go to Create</Link></p>
            <p><Link to="./:id">go to Show</Link></p>
            <Outlet />
          </div>,
          children: [
            {
              path: "create",
              element: <div>Create</div>,
            },
            {
              path: ":id",
              element: <div>
                <p>Id</p>
                <p><Link to="./edit">go to Edit</Link></p>
                <Outlet />
              </div>,
              children: [
                {
                  path: "edit",
                  element: <div>Id edit</div>,
                },
              ]
            },
          ]
        },
        // {
        //   path: "/logout",
        //   element: <Logout/>,
        // },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [  
    {
      path: "/login",
      element: <Login/>,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
