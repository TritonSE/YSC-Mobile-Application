import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, Pressable, ScrollView, SafeAreaView, TextInput } from "react-native";

import BackArrow from "../../assets/icons/back_arrow.png";
import SearchIcon from "../../assets/icons/search.png";
import Button from "../components/Button";
import OneButtonPopup from "../components/popups/OneButtonPopup";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const SelectionRow = ({ socket, username, status, alt, setDialog, variant, navigation }) => {
  let text;
  let color;

  if (variant === 0) {
    const buttonText = {
      ready: "Play",
      ingame: "In Game",
      lesson: "In Lesson",
    };
    text = buttonText[status] ?? "Play";
    color = status === "ready" ? "#7FCC26" : "#DBEDF9";
  } else if (variant === 1) {
    const buttonText = {
      ready: "Invite",
      ingame: "In Game",
      lesson: "Join",
    };
    text = buttonText[status] ?? "Invite";
    color = status !== "ingame" ? "#7FCC26" : "#DBEDF9";
  } else {
    text = "View";
    color = "#7FCC26";
  }

  return (
    <View style={[AppStylesheet.studentSelectionRow, { backgroundColor: !alt ? "#96C9577F" : "" }]}>
      <View style={AppStylesheet.studentSelectionColumn}>
        <Text style={AppStylesheet.usernameHeader}>{username}</Text>
      </View>
      <View>
        <Pressable
          style={[AppStylesheet.button, { marginTop: 0, width: 100, backgroundColor: color }]}
          onPress={() => {
            switch (variant) {
              case 0:
                if (status === "ready") {
                  socket.emit("send invite", username);
                  setDialog({ variant: 1 });
                }
                break;
              case 1:
                if (status === "ready") {
                  socket.emit("send invite", username, true);
                  setDialog({ variant: 1 });
                } else if (status === "lesson") {
                  socket.emit("join room", username);
                }
                break;
              case 2:
                navigation.navigate("LessonHomeScreen", { username, progress: status });
                break;
            }
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "Roboto" }}>{text}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const StudentSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [dialog, setDialog] = useState(false);

  const screenVariant = route?.params?.variant ?? 0 + !!(userState.role === "mentor");

  useEffect(() => {
    if (screenVariant === 2) {
      const int = setInterval(() => {
        socket.emit("request list of progress");
      }, 5000);
      socket.emit("request list of progress");
      socket.on("send list of progress", (p) => {
        setPlayers(p.filter(({ username }) => username !== userState.username));
      });
      return () => {
        clearInterval(int);
        socket.off("send list of progress");
      };
    }

    const int = setInterval(() => {
      socket.emit("request list of players");
    }, 5000);
    socket.emit("request list of players");
    socket.on("send list of players", (p) => {
      setPlayers(
        p.filter(
          ({ username, userRole }) =>
            username !== userState.username && (screenVariant === 2 || userRole === "student")
        )
      );
    });

    socket.on("failed to send invite", (reason: string | undefined) => {
      setDialog({ variant: 2, text: reason ?? "Failed to send invite." });
    });

    socket.on("invite accepted", () => {
      setDialog({ variant: 0 });
    });
    socket.on("invite declined", () => {
      setDialog({ variant: 2, text: "Invite request declined." });
    });

    return () => {
      clearInterval(int);
      socket.off("send list of players");
      socket.off("failed to send invite");
      socket.off("failed to send invite");
      socket.off("invite accepted");
      socket.off("invite declined");
    };
  }, []);

  return (
    <>
      {dialog.variant === 1 && (
        <OneButtonPopup
          labelText="Request sent! Waiting..."
          buttonText="Cancel"
          buttonFunc={() => {
            socket.emit("cancel invite");
            setDialog({ variant: 0 });
          }}
        />
      )}

      {dialog.variant === 2 && (
        <OneButtonPopup
          labelText={dialog.text}
          buttonText="Cancel"
          buttonFunc={() => {
            setDialog({ variant: 0 });
          }}
        />
      )}

      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={AppStylesheet.container}>
          <View style={AppStylesheet.studentSelectionHeader}>
            {screenVariant !== 2 && (
              <View style={AppStylesheet.studentSelectionBack}>
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <Image style={{ width: 20, height: 20, marginRight: "15%" }} source={BackArrow} />
                  <Text style={{ fontSize: 16, fontFamily: "Roboto", marginTop: "2%" }}>Back</Text>
                </Pressable>
              </View>
            )}

            <Text style={{ flex: 8, fontSize: 16, fontFamily: "RobotoBold", textAlign: "center" }}>
              {players.length} Student{players.length !== 1 ? "s" : ""} Online{" "}
              <View
                style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#96C957" }}
              />
            </Text>

            {screenVariant !== 2 && <View style={{ width: "20%" }} />}
          </View>

          <View style={AppStylesheet.searchFlex}>
            <View style={{ flex: 3 }} />
            <View style={AppStylesheet.searchInput}>
              <Image style={{ width: 16, height: 16, marginRight: "2%" }} source={SearchIcon} />
              <TextInput
                style={{ fontFamily: "Roboto", width: "88%" }}
                onChangeText={setSearch}
                value={search}
                placeholder="Search"
                placeholderTextColor="#000"
              />
            </View>
          </View>

          <ScrollView
            style={[AppStylesheet.studentSelectionContainer, { flexDirection: "column" }]}
          >
            {players.length <= Math.max(0, 1 - screenVariant) && (
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  marginTop: "50%",
                  fontFamily: "Roboto",
                }}
              >
                No {["other players online", "students online", "progress found"][screenVariant]}!
              </Text>
            )}
            {players.length > 0 && screenVariant === 0 && (
              <View style={AppStylesheet.studentSelectionRow}>
                <Button
                  text="Play Someone Random!"
                  style={{ marginBottom: 20 }}
                  onPress={() => {
                    socket.emit("assign to room", "student");
                    navigation.navigate("LoadingScreen");
                  }}
                />
              </View>
            )}
            {players
              .filter(({ username }) => username.includes(search.trim()))
              .map(({ username, status }, i) => (
                <SelectionRow
                  key={username}
                  socket={socket}
                  username={username}
                  status={status}
                  alt={i % 2 === 1}
                  setDialog={setDialog}
                  variant={screenVariant}
                  navigation={navigation}
                />
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
export default StudentSelectionScreen;
