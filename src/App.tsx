import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Main from "./Pages/Main";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/Layout";
import Songs from "./Pages/Songs";
const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/home",
          element: <Main />
        },
        {
          path: "/songs",
          element: <Songs />
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
