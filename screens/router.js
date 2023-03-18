import AuthStackNavigation from './auth/AuthStack/AuthStack';
import HomeStackNavigation from './mainScreen/HomeStack/HomeStack';

const useRoute = auth => {
  if (!auth) {
    return <AuthStackNavigation />;
  }
  return <HomeStackNavigation />;
};

export default useRoute;
