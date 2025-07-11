import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import{ConfigProvider, AdaptivityProvider, AppRoot} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css'

const rootElement = document.getElementById("root");
if(rootElement){
  const root=createRoot(rootElement);
  root.render(
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <StrictMode>
            <BrowserRouter>
             <App/>
            </BrowserRouter>
          </StrictMode>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );  
}
