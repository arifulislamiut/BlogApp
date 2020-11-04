import React, {useState, useEffect} from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator, AsyncStorage,
} from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {AuthContext, AuthProvider} from "../providers/AuthProvider";
import {getPosts} from "./../requests/Posts";
import {getUsers} from "./../requests/Users";
import {storePost, getPost} from "../functions/AsyncStorageFunctions";

const HomeScreen = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState("Empty");

    const loadPosts = async () => {
        setLoading(true);
        const response = JSON.parse(await AsyncStorage.getItem("post"));
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
                            centerComponent={{text: "The Blogger", style: {color: "#fff"}}}
                            rightComponent={{
                                icon: "lock-outline",
                                color: "#fff",
                                onPress: function () {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                },
                            }}
                        />
                        <Card>
                            <Input
                                placeholder="What's On Your Mind?"
                                leftIcon={<Entypo name="pencil" size={24} color="black"/>}
                                onChangeText={function (currentInput) {
                                    setPost(currentInput);
                                }}
                            />
                            <Button title="Post" type="outline" onPress={async function () {

                                let name = await AsyncStorage.getItem("myname")
                                let value = {
                                    postedBy: name,
                                    text: post,
                                    postID: Date.now()
                                }


                                await storePost("post", value)
                                loadPosts()
                                console.log("posted")
                            }}/>
                        </Card>

                        <FlatList
                            data={posts}
                            renderItem={function ({item}) {
                                return (
                                    <PostCard
                                        author={item.postedBy}
                                        title={item.postID}
                                        body={item.text}
                                        props={props}
                                    />
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

export default HomeScreen;
