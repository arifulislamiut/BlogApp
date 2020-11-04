import React, {useEffect, useState} from "react";
import {View, StyleSheet, AsyncStorage, FlatList, ActivityIndicator} from "react-native";
import {Text, Card, Button, Avatar, Header, Input} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import {Entypo} from "@expo/vector-icons";
import {getPost, storePost} from "../functions/AsyncStorageFunctions";

const PostScreen = ({route}) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState("Empty");

    const key = "comments" + route.params.title
    const notiKey = "noti"+ route.params.author


    const loadComment = async () => {
        setLoading(true);
        const response = JSON.parse(await AsyncStorage.getItem(key));
        if (response != null) {
            setComments(response);
        }
        setLoading((false))
    };

    useEffect(() => {
        loadComment();
    }, []);


    if(!loading) {
        return (
            <AuthContext.Consumer>
                {(auth) => (
                    <View style={styles.viewStyle}>
                        <PostCard
                            author={route.params.author}
                            title={route.params.title}
                            body={route.params.body}
                        />

                        <Card>
                            <Input
                                placeholder="Write a comment"
                                leftIcon={<Entypo name="pencil" size={24} color="black"/>}
                                onChangeText={function (currentInput) {
                                    setPost(currentInput);
                                }}
                            />
                            <Button title="Post" type="outline" onPress={async function () {

                                let name = await AsyncStorage.getItem("myname")
                                let value = {
                                    postedBy: name,
                                    comment: post,
                                    commentID: Date.now()
                                }

                                const noti = {
                                    postedBy: name,
                                    type: "Comment",
                                    author:route.params.author,
                                    title:route.params.title,
                                    body:route.params.body,
                                }

                                console.log("saving as " +key + value)

                                await storePost(notiKey, noti)

                                console.log("saving as "+ notiKey )
                                console.log(await getPost(notiKey))
                                console.log("get as "+ notiKey )
                                await storePost(key, value)
                                loadComment()
                            }}/>
                        </Card>


                        <FlatList
                            data={comments}
                            renderItem={function ({item}) {
                                return (
                                    <CommentCard
                                        author={item.postedBy}
                                        comment={item.comment}/>
                                );
                            }}
                        />
                    </View>

                )}
            </AuthContext.Consumer>
        );
    }else {
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

export default PostScreen;
