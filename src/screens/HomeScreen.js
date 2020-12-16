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
import firebase from "firebase/app";


const HomeScreen = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState("Empty");

    const loadPosts = async () => {
        setLoading(true);

        firebase.database().ref("Posts").on('value', (snap)=>{

            let posts = []
            snap.forEach(function (post){
                let pos = {
                    postID: post.val().postID,
                    postedBy: post.val().postedBy,
                    text: post.val().text
                }
                posts.push(pos)
            })

            setPosts(posts)

        })
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
                                    firebase.auth().signOut().then(()=>{
                                        auth.setIsLoggedIn(false);
                                        auth.setCurrentUser({});
                                    }).catch((error)=>{
                                        alert(error)
                                    })
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

                                let name = firebase.auth().currentUser.displayName
                                 let ref = firebase.database().ref("Posts").push()
                                let value = {
                                    postedBy: name,
                                    text: post,
                                    postID: ref.key
                                }
                                ref.set(value).then(()=>{
                                    alert("Your post Id "+ ref.key)
                                }).catch((error)=>{
                                    alert(error)
                                })
                                await loadPosts()
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
