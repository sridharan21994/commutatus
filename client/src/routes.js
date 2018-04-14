import Base from './components/Base.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

const routes ={
    component : Base,
    childRoutes:[
        {
      path: '/*',
      getComponent: (location, callback) => {
          callback(null, DashboardPage);
      }
     }
    ]
};

export default routes;