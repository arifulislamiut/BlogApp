import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Input, Button, Card} from "react-native-elements";
import {FontAwesome, Feather, AntDesign, Ionicons} from "@expo/vector-icons";
import {storeDataJSON} from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <View style={styles.viewStyle}>
            <Card>
                <Card.Title>Welcome to AuthApp!</Card.Title>
                <Card.Divider/>
                <Input
                    leftIcon={<Ionicons name="ios-person" size={24} color="black"/>}
                    placeholder="Name"
                    onChangeText={function (currentInput) {
                        setName(currentInput);
                    }}
                />
                <Input
                    leftIcon={<Ionicons name="ios-school" size={24} color="black"/>}
                    placeholder="Student ID"
                    onChangeText={function (currentInput) {
                        setSID(currentInput);
                    }}
                />
                <Input
                    leftIcon={<FontAwesome name="envelope" size={24} color="black"/>}
                    placeholder="E-mail Address"
                    onChangeText={function (currentInput) {
                        setEmail(currentInput);
                    }}
                />

                <Input
                    placeholder="Password"
                    leftIcon={<Feather name="key" size={24} color="black"/>}
                    secureTextEntry={false}
                    onChangeText={function (currentInput) {
                        setPassword(currentInput);
                    }}
                />

                <Button
                    icon={<AntDesign name="user" size={24} color="white"/>}
                    title="  Sign Up!"
                    type="solid"
                    onPress={function () {
                        if (Name && SID && Email && Password) {
                            firebase.auth().createUserWithEmailAndPassword(Email, Password).then((userCards) => {
                                userCards.user.updateProfile({displayName: Name});
                                firebase.database().ref().child("Users").child(userCards.user.uid).set({
                                    name: Name,
                                    sid: SID,
                                    email: Email
                                }).then(() => {
                                    alert("User : "+ userCards.user.uid+" added successfully")
                                    props.navigation.navigate("SignIn")
                                }).catch((error) => {
                                    alert(error)
                                })
                            })
                        }
                        props.navigation.navigate("SignIn");
                    }}
                />
                <Button
                    type="clear"
                    icon={<AntDesign name="login" size={24} color="dodgerblue"/>}
                    title="  Already have an account?"
                    onPress={function () {
                        props.navigation.navigate("SignIn");
                    }}
                />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#4bacb8",
    },
});
export default SignUpScreen;
