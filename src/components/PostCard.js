import React from "react";
import {AsyncStorage, View} from "react-native";
import {Card, Button, Text, Avatar} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Link} from "@react-navigation/native";
import PostScreen from "../screens/PostScreen";
import {getPost, storePost} from "../functions/AsyncStorageFunctions";


const PostCard = (props) => {


    const key = "like" + props.title
    const notiKey = "noti"+ props.author

    console.log("Noti key    dkfd  fjkjdsjf fjf" +notiKey)

    return (
        <Card>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Avatar
                    containerStyle={{backgroundColor: "#ffab91"}}
                    rounded
                    icon={{name: "user", type: "font-awesome", color: "black"}}
                    activeOpacity={1}
                />
                <Text h4Style={{padding: 10}} h4>
                    {props.author}
                </Text>
            </View>
            <Text style={{fontStyle: "italic"}}> {props.title}</Text>
            <Text
                style={{
                    paddingVertical: 10,
                }}
            >
                {props.body}
            </Text>
            <Card.Divider/>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Button
                    type="outline"
                    title="  Like"
                    onPress={async function () {


                        let name = await AsyncStorage.getItem("myname")
                        let value = {
                            postedBy: name,
                            commentID: Date.now()
                        }

                        const noti = {
                            postedBy: name,
                            type: "Like",
                            author:props.author,
                            title:props.title,
                            body:props.body,
                        }

                        await storePost(notiKey, noti)

                        console.log(await getPost(notiKey))
                        await storePost(key, value)
                    }}
                    icon={<AntDesign name="like2" size={24} color="dodgerblue"/>}
                />
                <Button
                    type="solid"
                    title="Comment"
                    onPress={function () {
                        try {
                            props.props.navigation.navigate('Post', {
                                author: props.author,
                                title: props.title, body: props.body
                            });
                        } catch (e) {

                        }
                    }}/>
            </View>
        </Card>
    );
};

export default PostCard;
