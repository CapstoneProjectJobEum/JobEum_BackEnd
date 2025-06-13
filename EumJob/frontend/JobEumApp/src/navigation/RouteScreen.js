import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ 추가

import SCREENS from '../Screens';
import IMAGES from '../assets/images';
import COLORS from '../constants/colors';

import HomeScreen from '../Screens/tabs/HomeScreen';
import RecommendScreen from '../Screens/tabs/RecommendScreen';
import JobListScreen from '../Screens/tabs/JobListScreen';
import ScrapScreen from '../Screens/tabs/ScrapScreen';
import MyScreenWrapper from '../Screens/tabs/MyScreenWrapper';
import NotificationScreen from '../Screens/Pages/NotificationScreen';
import MenuScreen from '../Screens/Pages/MenuScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabWithHeader = () => {
    const navigation = useNavigation(); // ✅ 여기서 navigation 훅 사용

    return (
        <TabNavigator
            headerRight={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.NOTIFICATION)}>
                        <Image source={IMAGES.NOTIFICATION} style={styles.iconRight} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.MENU)} style={{ marginRight: 15 }}>
                        <Image source={IMAGES.MENU} style={styles.iconLeft} />
                    </TouchableOpacity>
                </View>
            }
        />
    );
};

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTab"
                component={MainTabWithHeader}
                options={{
                    headerRight: () => <MainTabHeader />,
                    // headerBackTitle: '',
                }}
            />
            <Stack.Screen name={SCREENS.NOTIFICATION} component={NotificationScreen} />
            <Stack.Screen name={SCREENS.MENU} component={MenuScreen} />
        </Stack.Navigator>
    );
};

const MainTabHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.NOTIFICATION)}>
                <Image source={IMAGES.NOTIFICATION} style={styles.iconRight} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.MENU)} style={{ marginRight: 15 }}>
                <Image source={IMAGES.MENU} style={styles.iconLeft} />
            </TouchableOpacity>
        </View>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={SCREENS.HOME}>
            <Tab.Screen
                name={SCREENS.HOME}
                component={HomeScreen}
                options={{
                    title: '홈',
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.HOME} style={tabIconStyle(focused)} />
                    ),
                    headerShown: false,
                    ...tabBarStyleOptions,
                }}
            />
            <Tab.Screen
                name={SCREENS.RECOMMEND}
                component={RecommendScreen}
                options={{
                    title: '추천',
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.RECOMMEND} style={tabIconStyle(focused)} />
                    ),
                    headerShown: false,
                    ...tabBarStyleOptions,
                }}
            />
            <Tab.Screen
                name={SCREENS.JOBLIST}
                component={JobListScreen}
                options={{
                    title: '채용공고',
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.JOBLIST} style={tabIconStyle(focused)} />
                    ),
                    headerShown: false,
                    ...tabBarStyleOptions,
                }}
            />
            <Tab.Screen
                name={SCREENS.SCRAP}
                component={ScrapScreen}
                options={{
                    title: '모아보기',
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.SCRAP} style={tabIconStyle(focused)} />
                    ),
                    headerShown: false,
                    ...tabBarStyleOptions,
                }}
            />
            <Tab.Screen
                name={SCREENS.MY}
                component={MyScreenWrapper}
                options={{
                    title: 'MY',
                    tabBarIcon: ({ focused }) => (
                        <Image source={IMAGES.MY} style={tabIconStyle(focused)} />
                    ),
                    headerShown: false,
                    ...tabBarStyleOptions,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconLeft: {
        width: 25,
        height: 25,
        marginLeft: 15,
    },
    iconRight: {
        width: 25,
        height: 25,
        marginRight: 15,
    },
});

const tabIconStyle = (focused) => ({
    height: 30,
    width: 30,
    tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT,
});

const tabBarStyleOptions = {
    tabBarActiveTintColor: COLORS.BLACK,
    tabBarInactiveTintColor: COLORS.GRAY_LIGHT,
};

export default StackNavigation;
