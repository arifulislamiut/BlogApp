import React, {useEffect, useState} from "react";
import {View, StyleSheet, AsyncStorage, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {Text, Card, Button, Avatar, Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import NotificationCard from "../components/NotificationCard";
import {getPost} from "../functions/AsyncStorageFunctions";

const NotificationScreen = (props) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadPosts = async () => {
        setLoading(true);

        let name = await AsyncStorage.getItem("myname")
        const notiKey = "noti" + name;
        console.log(notiKey + "ijsdf slif jl fj fsf in noti")
        const response = await getPost(notiKey);
        if (response != null) {
            setPosts(response);
        }
        setLoading((false))
    };

    useEffect(() => {
        loadPosts();
    }, []);


    if (!loading) {
        return (
            <AuthContext.Consumer>
                {(auth) => (
                    <View style={styles.viewStyle}>
                        <Header
                            leftComponent={{
                                icon: "menu",
                                color: "#fff",
                                onPress: function () {
                                    props.navigation.toggleDrawer();
                                },
                            }}
                            centerComponent={{text: "The Office", style: {color: "#fff"}}}
                            rightComponent={{
                                icon: "lock-outline",
                                color: "#fff",
                                onPress: function () {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                },
                            }}
                        />

                        <FlatList
                            data={posts}
                            renderItem={function ({item}) {
                                return (
                                    <TouchableOpacity onPress={function () {
                                        try {
                                            props.navigation.navigate('Post', {
                                                author: item.author,
                                                title: item.title, body: item.body
                                            });
                                        } catch (e) {

                                        }
                                    }}
                                    >
                                        <NotificationCard
                                            postedBy={item.postedBy}
                                            author={item.author}
                                            title={item.title}
                                            body={item.body}
                                            type={item.type}
                                            props={props}
                                        />
                                    </TouchableOpacity>

                                );
                            }}
                        />
                    </View>
                )}
            </AuthContext.Consumer>
        );
    } else {
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator size="large" color="red" animating={true}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
    },
    viewStyle: {
        flex: 1,
    },
});

export default NotificationScreen;
