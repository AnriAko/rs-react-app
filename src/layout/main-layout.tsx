import { Outlet } from 'react-router';
import { Header } from 'layout/header';

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {}
      </main>
    </div>
  );
};
