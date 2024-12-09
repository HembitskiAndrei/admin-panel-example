import type { TAlbum, TPhoto } from "@/types";
import { useAuth } from "@/provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "@/components/Login";
import { MainComponent } from "@/components/MainComponent";
import { MainHeader } from "@/components/MainHeader";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import { AlbumsList } from '@/components/AlbumsList';
import { CreateAlbum } from '@/components/CreateAlbum';
import { ShowAlbum } from '@/components/ShowAlbum';
import { ShowPhoto } from '@/components/ShowPhoto';
import { makeData } from "../utils/makeData";
import { PageNotFound } from "@/components/PageNotFound";

const AppRoutes = () => {
  const { token } = useAuth();
  
  const data = makeData(20);
  const photoDataMap = new Map<string, Map<string, TPhoto>>();
  const dataMap = new Map<string, TAlbum>(data.map((obj: TAlbum) => {
    photoDataMap.set(
      `${obj.id}`, 
      new Map<string, TPhoto>(obj.photos.map((photoObj: TPhoto) => [`${photoObj.title}`, photoObj]))
    )

    return [`${obj.id}`, obj]
  }));

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
          path: "*",
          element: <PageNotFound />,
        },
        {
          path: "",
          element:
            <MainComponent>
              <MainHeader 
                    title="Dashboard"
                />
            </MainComponent>,
        },
        {
          path: "albums",
          element: <MainComponent />,
          children: [
            {
              path: "",
              element: <AlbumsList transferredDataMap={dataMap} />,
            },
            {
              path: "create",
              element: <CreateAlbum headTitle="Create album" transferredDataMap={dataMap} />,
            },
            {
              path: ":id",
              element: <ShowAlbum transferredDataMap={dataMap} />,
            },
            {
              path: ":id/:photoName",
              element: <ShowPhoto transferredDataMap={photoDataMap} />,
            },
            {
              path: ":id/edit",
              element: <CreateAlbum headTitle="Edit album" transferredDataMap={dataMap} />,             
            },
          ]
        },        
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
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true      
    }
  });

  return <RouterProvider router={router} future={{v7_startTransition: true}} />;
};

export default AppRoutes;
