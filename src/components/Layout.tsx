import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
