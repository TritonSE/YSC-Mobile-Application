import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, Pressable, ScrollView, SafeAreaView, TextInput } from "react-native";

import BackArrow from "../../assets/back_Arrow.png";
import SearchIcon from "../../assets/searchIcon.png";
import PlayersOnline from "../components/PlayersOnline";
import OneButtonPopup from "../components/popups/OneButtonPopup";
import TwoButtonPopup from "../components/popups/TwoButtonPopup";
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
          AppStylesheet.studentSelectionButton,
          status === "ingame" ? { backgroundColor: "#DBEDF9" } : {},
        ]}
        onPress={() => {
          socket.emit("send invite", username);
          setDialog({ variant: 1 });
        }}
      >
        <Text style={{ fontSize: 18 }}>{status === "ingame" ? "In Game" : "Play"}</Text>
      </Pressable>
    </View>
  </View>
);

const StudentSelectionScreen = () => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [dialog, setDialog] = useState({ variant: 0 });

  useEffect(() => {
    const int = setInterval(() => {
      socket.emit("request list of players");
    }, 5000);
    socket.emit("request list of players");
    socket.on("send list of players", setPlayers);

    socket.on("invited", (username) => {
      setDialog({ variant: 2, username });
    });
    socket.on("uninvited", () => {
      setDialog({ variant: 0 });
    });

    socket.on("failed to send invite", (reason: string | undefined) => {
      setDialog({ variant: 3, text: reason ?? "Failed to send invite." });
    });

    socket.on("invite accepted", () => {
      setDialog({ variant: 0 });
    });
    socket.on("invite declined", () => {
      setDialog({ variant: 3, text: "Invite request declined." });
    });

    socket.on("successful assign", (color: string, names: string[]) => {
      navigation.navigate("Chess", { color, players: names });
    });

    return () => {
      clearInterval(int);
      socket.off("send list of players");
      socket.off("invited");
      socket.off("uninvited");
      socket.off("failed to send invite");
      socket.off("invite accepted");
      socket.off("invite declined");
      socket.off("successful assign");
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
        <TwoButtonPopup
          labelText={`${dialog.username} has invited you to a game.  Accept?`}
          noFunc={() => {
            socket.emit("decline invite");
            setDialog({ variant: 0 });
          }}
          yesFunc={() => {
            socket.emit("accept invite");
            setDialog({ variant: 0 });
          }}
        />
      )}

      {dialog.variant === 3 && (
        <OneButtonPopup
          labelText={dialog.text}
          buttonText="Ok"
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
                style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}
              >
                <Image style={{ width: 15, height: 15, marginRight: "15%" }} source={BackArrow} />
                <Text>Back</Text>
              </Pressable>
            </View>

            <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
              <PlayersOnline isSmall />{" "}
              <View
                style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#96C957" }}
              />
            </Text>

            <View style={{ width: "10%" }} />
          </View>

          <View style={AppStylesheet.searchFlex}>
            <View style={{ flex: 3 }} />
            <View style={AppStylesheet.searchInput}>
              <Image style={{ marginRight: "2%" }} source={SearchIcon} />
              <TextInput
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
              <Text style={{ fontSize: 18, textAlign: "center", marginTop: "50%" }}>
                No players online!
              </Text>
            )}
            {players.length > 0 && (
              <View style={AppStylesheet.studentSelectionRow}>
                <Pressable
                  style={AppStylesheet.studentSelectionButton}
                  onPress={() => {
                    socket.emit("assign to room");
                    navigation.navigate("LoadingScreen");
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Play Someone Random!</Text>
                </Pressable>
              </View>
            )}
            {players
              .filter(
                ({ username }) =>
                  username.includes(search.trim()) && username !== userState.username
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
