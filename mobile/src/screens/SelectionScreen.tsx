import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, Pressable, ScrollView, SafeAreaView, TextInput } from "react-native";

import BackArrow from "../../assets/icons/back_arrow.png";
import SearchIcon from "../../assets/icons/search.png";
import Button from "../components/Button";
import OneButtonPopup from "../components/popups/OneButtonPopup";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const SelectionRow = ({ socket, username, status, alt, setDialog }) => (
  <View style={[AppStylesheet.studentSelectionRow, { backgroundColor: !alt ? "#96C9577F" : "" }]}>
    <View style={AppStylesheet.studentSelectionColumn}>
      <Text style={AppStylesheet.usernameHeader}>{username}</Text>
    </View>
    <View>
      <Pressable
        style={[
          AppStylesheet.button,
          { marginTop: 0, width: 100 },
          status === "ingame" ? { backgroundColor: "#DBEDF9" } : { backgroundColor: "#7FCC26" },
        ]}
        onPress={() => {
          if (status === "ready") {
            socket.emit("send invite", username);
            setDialog({ variant: 1 });
          }
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "Roboto" }}>
          {status === "ingame" ? "In Game" : "Play"}
        </Text>
      </Pressable>
    </View>
  </View>
);

const StudentSelectionScreen = ({ role }) => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const int = setInterval(() => {
      socket.emit("request list of players");
    }, 5000);
    socket.emit("request list of players");
    socket.on("send list of players", setPlayers);

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
            <View style={AppStylesheet.studentSelectionBack}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{ alignItems: "center", justifyContent: "flex-start", flexDirection: "row" }}
              >
                <Image style={{ width: 20, height: 20, marginRight: "15%" }} source={BackArrow} />
                <Text style={{ fontSize: 16, fontFamily: "Roboto", marginTop: "2%" }}>Back</Text>
              </Pressable>
            </View>

            <Text style={{ flex: 8, fontSize: 16, fontFamily: "RobotoBold", textAlign: "center" }}>
              {players.length} Player{players.length !== 1 ? "s" : ""} Online{" "}
              <View
                style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#96C957" }}
              />
            </Text>

            <View style={{ width: "20%" }} />
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
            {players.length === 0 && (
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  marginTop: "50%",
                  fontFamily: "Roboto",
                }}
              >
                No players online!
              </Text>
            )}
            {players.length > 0 && (
              <View style={AppStylesheet.studentSelectionRow}>
                <Button
                  text="Play Someone Random!"
                  style={{ marginBottom: 20 }}
                  onPress={() => {
                    socket.emit("assign to room");
                    navigation.navigate("LoadingScreen");
                  }}
                />
              </View>
            )}
            {players
              .filter(
                ({ username, userRole }) =>
                  username.includes(search.trim()) &&
                  username !== userState.username &&
                  (!role || userRole === role)
              )
              .map(({ username, status }, i) => (
                <SelectionRow
                  key={username}
                  socket={socket}
                  username={username}
                  status={status}
                  alt={i % 2 === 1}
                  setDialog={setDialog}
                />
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
export default StudentSelectionScreen;
