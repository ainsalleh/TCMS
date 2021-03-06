import React from 'react';
import { TouchableOpacity, YellowBox } from 'react-native';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import SplashScreen from './Splash';
import PressureScreen from './Pressure';
import LifeSpanScreen from './Lifespan';
import SettingScreen from './Setting';
import LocationScreen from './Location';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class AppNavigator extends React.Component {
    render() {
        return <AppContainer />;
    }
}


const PressureStack = createStackNavigator();
function PressureStackScreen({ navigation }) {
    return (
        <PressureStack.Navigator
            initialRouteName="Pressure"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS   ///////////////////////////// AND HERE
            }}
        >
            <PressureStack.Screen
                name="Pressure"
                component={PressureScreen}
                options={{
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: 'red',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                        //gi dekat setting.js 
                        <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.navigate('Setting')}>
                            <Fontawesome name='cog' color={'white'} size={30} ></Fontawesome>
                        </TouchableOpacity>
                    ),
                }}

            />
            <PressureStack.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    title: 'Settings',
                    headerStyle: {
                        backgroundColor: 'red',
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}

                
            />
        </PressureStack.Navigator>
    );
}



const LifeSpanStack = createStackNavigator();
function LifeSpanStackScreen() {
    return (
        <LifeSpanStack.Navigator >
            <LifeSpanStack.Screen
                name="LifeSpan"
                component={LifeSpanScreen}
                options={{
                    title: 'Lifespan',
                    headerStyle: {
                        backgroundColor: 'red',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </LifeSpanStack.Navigator>
    );
}

const LocationStack = createStackNavigator();
function LocationStackScreen() {
    return (
        <LocationStack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS   ///////////////////////////// AND HERE
            }}
        >
            <LocationStack.Screen
                name="Location"
                component={LocationScreen}
                options={{
                    title: 'Workshop',
                    headerStyle: {
                        backgroundColor: 'red',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}

            />
        </LocationStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Pressure'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Pressure') {
                            iconName = 'exclamation-triangle';
                        } else if (route.name === 'LifeSpan') {
                            iconName = 'heartbeat';
                        } else if (route.name === 'Workshop') {
                            iconName = 'wrench';
                        }

                        // You can return any component that you like here!
                        return <Fontawesome name={iconName} size={size} color={color} />;
                    },
                })}

                tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: '#D8D8D8',
                    showLabel: true,
                    style: {
                        height: 50,
                        backgroundColor: 'red',
                        borderTopWidth: 0.8,
                    },
                    labelStyle: {
                        marginTop: -5,
                        marginBottom: 5
                    }
                }}
            >
                <Tab.Screen name="Pressure" component={PressureStackScreen} />
                <Tab.Screen name="LifeSpan" component={LifeSpanStackScreen} />
                <Tab.Screen name="Workshop" component={LocationStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


//First function call
const AppsNavigator = createAppContainer(createSwitchNavigator(
    {
        SplashScreen: SplashScreen,
        TabNavigatorScreen: App,
    },
    {
        initialRouteName: 'SplashScreen',
    }

));

const AppContainer = createAppContainer(AppsNavigator);
