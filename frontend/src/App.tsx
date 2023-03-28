import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWrapper } from '@/routing/components';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { envConfig } from './config';

const App = () => {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<div>{`Running on ${envConfig().text} mode`}</div>} />
      </RoutesWrapper>
    </BrowserRouter>
  );
};
export default App;
