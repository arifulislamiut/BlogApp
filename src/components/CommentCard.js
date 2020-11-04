import React from "react";
import {View} from "react-native";
import {Card, Button, Text, Avatar} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import {Link} from "@react-navigation/native";


const CommentCard = (props) => {

    console.log(props)

    return (
        <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar
                    containerStyle={{ backgroundColor: "cyan" }}
                    rounded
                    icon={{
                        name: "user",
                        type: "font-awesome",
                        color: "black",
                    }}
                    activeOpacity={1}
                />
                <Text style={{ paddingHorizontal: 10 }}>
                    {props.author}
                </Text>
                <Text style={{ paddingHorizontal: 10 }}>
                    {props.comment}
                </Text>
            </View>
        </Card>
    );
};

export default CommentCard;
