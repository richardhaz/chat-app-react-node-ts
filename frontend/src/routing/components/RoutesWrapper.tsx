import { NotFoundPage } from '@/pages/404';
import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const RoutesWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
