import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Result from "../components/Result";
import Playground from "../components/Playground";

export default function Router() {
  const element = useRoutes([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/play", element: <Playground /> },
        { path: "result", element: <Result /> },
      ],
    },
  ]);
  return element;
}
