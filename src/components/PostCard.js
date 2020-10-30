import React from "react";
import {View} from "react-native";
import {Card, Button, Text, Avatar} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Link} from "@react-navigation/native";
import PostScreen from "../screens/PostScreen";


const PostCard = (props) => {

  const youHandleClickFunc = function() {
      console.log(props.author+ 'you need params from Card............')
      return (<Link to={PostScreen(props)} children={PostScreen}/>);
  }
  return (
          <TouchableOpacity onPress={youHandleClickFunc}>
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
                        title="  Like (17)"
                        icon={<AntDesign name="like2" size={24} color="dodgerblue"/>}
                    />
                    <Button type="solid" title="Comment (10)"/>
                </View>
            </Card>
            </TouchableOpacity>
    );
};

export default PostCard;
