import React from "react";
import {View} from "react-native";
import {Card, Button, Text, Avatar, Header} from "react-native-elements";


const NotificationCard = (props) => {

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
                    {props.postedBy + " "+ props.type + " On Your Post"}
                </Text>
            </View>
        </Card>
    );
};

export default NotificationCard;
