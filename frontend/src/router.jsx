import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { PlantPage } from './pages/AllPlantsPage';
import { MyGarden } from './pages/MyGarden';
import { PlantDetailsPage } from './pages/PlantDetailsPage';
import { ResultsPage } from './pages/ResultsPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'register',
                element: <RegisterPage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'profile',
                element: <UserProfilePage/>
            },
            {
                path: 'plants',
                element: <PlantPage/>
            },
            {
                path: 'garden',
                element: <MyGarden/>
            },
            {
                path: 'plant/:id',
                element: <PlantDetailsPage/>
            },
            {
                path: 'results/:name',
                element: <ResultsPage/>
            }
        ]
    }
])