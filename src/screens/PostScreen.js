import React, {useEffect, useState} from "react";
import {View, StyleSheet, AsyncStorage, FlatList, ActivityIndicator} from "react-native";
import {Text, Card, Button, Avatar, Header, Input} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import {Entypo} from "@expo/vector-icons";
import * as firebase from "firebase";

const PostScreen = ({route}) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState("Empty");

    const key = "comments" + route.params.title
    const notiKey = "noti" + route.params.author
    const loadComment = async () => {
        setLoading(true);
        firebase.database().ref("Posts").child(route.params.title).child("comments").on('value', (snap)=>{

            let posts = []
            snap.forEach(function (post){

                let pos = {
                    commentID: post.val().commentID,
                    postedBy: post.val().postedBy,
                    comment: post.val().comment
                }
                posts.push(pos)
            })
            setComments(posts)
        })

        setLoading((false))
    };

    useEffect(() => {
        loadComment().then(r => {
            console.log("ok")
        }).catch((e)=>{
            console.log(e)
        })
    }, []);


    if (!loading) {
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

                                let name = firebase.auth().currentUser.displayName
                                let cid = Date.now()
                                let value = {
                                    postedBy: name,
                                    comment: post,
                                    commentID: cid
                                }

                                const noti = {
                                    postedBy: name,
                                    type: "Comment",
                                    author: route.params.author,
                                    title: route.params.title,
                                    body: route.params.body,
                                }
                                firebase.database().ref("Users").child(route.params.title).child("comments").child(cid.toString()).update(value).then(() => {
                                    alert("Comment added : " + cid)
                                }).catch((error) => {
                                    alert(error)
                                })

                                await loadComment()
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

export default PostScreen;
