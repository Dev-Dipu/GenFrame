import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layouts/MainLayout";
import PostPage from "../pages/PostPage";
import FormPage from "../pages/FormPage";
import ImaginePage from "../pages/ImaginePage";

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <PostPage />,
                },
                {
                    path: "create",
                    element: <FormPage />,
                },
                {
                    path: "imagine",
                    element: <ImaginePage />
                }
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
