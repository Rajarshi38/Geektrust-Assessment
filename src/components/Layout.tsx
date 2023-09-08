import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className={`container mx-auto px-8 py-12`}>
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold">Finding Falcone</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
