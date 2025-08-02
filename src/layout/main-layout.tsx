import { Outlet } from 'react-router';
import { Header } from '@components/header/header';

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
