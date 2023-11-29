import './App.css';
import {Provider} from 'mobx-react';
import {ReactBaseProvider, Toaster} from '@wemogy/reactbase';
import {RouterProvider} from 'react-router-dom';

function App() {
    return (
        <Provider>
            <ReactBaseProvider theme={} themeDependencies={{ useThemeModeHook: () => "default", themeDeclaration:  }}>
                <RouterProvider router={}/>
                <Toaster closeButton richColors position="top-right" style={{ top: 76, right: 16 }}/>
            </ReactBaseProvider>
        </Provider>
    );
}

export default App;
