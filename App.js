import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "./src/screens/HomeScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import PostScreen from "./src/screens/PostScreen";

import {AuthContext, AuthProvider} from "./src/providers/AuthProvider";
import {Entypo, AntDesign, Ionicons} from "@expo/vector-icons";
import * as firebase from "firebase";

const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const PostStack = createStackNavigator();

var firebaseConfig = {
    apiKey: "AIzaSyBGikc92NLo5zUeKTV7LUruY2LRcqQIzlY",
    authDomain: "blogapp-a9ee9.firebaseapp.com",
    databaseURL: "https://blogapp-a9ee9-default-rtdb.firebaseio.com",
    projectId: "blogapp-a9ee9",
    storageBucket: "blogapp-a9ee9.appspot.com",
    messagingSenderId: "660384679096",
    appId: "1:660384679096:web:4e505a0c0964b111af604d",
    measurementId: "G-ZL9KP1XRZM"
};
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const AppDrawerScreen = () => {
    return (
        <AppDrawer.Navigator initialRouteName="Home">
            <AppDrawer.Screen name="Home" component={PostStackNav}/>
            <AppDrawer.Screen name="Profile" component={ProfileScreen}/>
        </AppDrawer.Navigator>
    );
};

const HomeTabScreen = () => {
    return (
        <HomeTab.Navigator initialRouteName="Home">
            <HomeTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Entypo name="home" color="white" size={26}/>
                        ) : (
                            <AntDesign name="home" color="white" size={22}/>
                        ),
                }}
            />
            <HomeTab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: "Notifications",
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Ionicons name="ios-notifications" size={26} color="white"/>
                        ) : (
                            <Ionicons
                                name="ios-notifications-outline"
                                size={22}
                                color="white"
                            />
                        ),
                }}
            />
        </HomeTab.Navigator>
    );
};

const PostStackNav = () => {
    return (
        <PostStack.Navigator initialRouteName="Tab">
            <PostStack.Screen
                name="Tab"
                component={HomeTabScreen}
                options={{headerShown: false}}
            />
            <PostStack.Screen
                name="Post"
                component={PostScreen}
                options={{headerShown: true}}
            />
        </PostStack.Navigator>

    )
}

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator initialRouteName="SignIn">
            <AuthStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{headerShown: false}}
            />
            <AuthStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{headerShown: false}}
            />
        </AuthStack.Navigator>
    );
};

function App() {
    return (
        <AuthProvider>
            <AuthContext.Consumer>
                {(auth) => (
                    <NavigationContainer>
                        {auth.IsLoggedIn ? <AppDrawerScreen/> : <AuthStackScreen/>}
                    </NavigationContainer>
                )}
            </AuthContext.Consumer>
        </AuthProvider>
    );
}

export default App;
