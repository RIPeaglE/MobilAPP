import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../components/home';
import News from '../components/News';
import Weather from '../components/Weather';

const components = {
    Home: {
        screen: Home
    },
    News: {
        screen: News
    },
    Weather: {
        screen: Weather
    },
}

const HomeStack = createStackNavigator(components);

export default createAppContainer(HomeStack);