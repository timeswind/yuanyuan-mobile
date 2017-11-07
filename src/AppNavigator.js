import { TabNavigator, StackNavigator } from "react-navigation";
import WalletScreen from './screens/WalletScreen'
import GuideScreen from './screens/GuideScreen'
import GuideMapScreen from './screens/GuideMapScreen'
import CardDetailScreen from './screens/CardDetailScreen'
import NewsDetailScreen from './screens/NewsDetailScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileDetailScreen from './screens/ProfileDetailScreen'

const MainTabNavigator = TabNavigator(
  {
    Guide: {
      screen: GuideScreen
    },
    Wallet: {
      screen: WalletScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    tabBarPosition: 'bottom'
  }
);

export const MainCardNavigator = StackNavigator({
  MainTabNavigator: {
    screen: MainTabNavigator,
  },
  newsDetail: {
    path: 'newsDetail',
    screen: NewsDetailScreen
  },
  cardDetail: {
    path: 'cardDetail',
    screen: CardDetailScreen
  },
  guideMap: {
    path: 'guidemap',
    screen: GuideMapScreen,
  },
  profileDetail: {
    path: 'profileDetail',
    screen: ProfileDetailScreen,
  }
},
{
  navigationOptions: {
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: "#fff"
    }
  }
});

const MainModalNavigator = StackNavigator(
  {
    MainCardNavigator: { screen: MainCardNavigator },
    login: {
      path: 'login',
      screen: LoginScreen,
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default MainModalNavigator
