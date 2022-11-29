// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { Chess, Position } from "chess.js";
import React, { useCallback, useContext, createRef } from "react";
import { StyleSheet, Image } from "react-native";
import { TapGestureHandler, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";

import bbPiece from "../../../assets/piece_images/bb.png";
import bkPiece from "../../../assets/piece_images/bk.png";
import bnPiece from "../../../assets/piece_images/bn.png";
import bpPiece from "../../../assets/piece_images/bp.png";
import bqPiece from "../../../assets/piece_images/bq.png";
import brPiece from "../../../assets/piece_images/br.png";
import wbPiece from "../../../assets/piece_images/wb.png";
import wkPiece from "../../../assets/piece_images/wk.png";
import wnPiece from "../../../assets/piece_images/wn.png";
import wpPiece from "../../../assets/piece_images/wp.png";
import wqPiece from "../../../assets/piece_images/wq.png";
import wrPiece from "../../../assets/piece_images/wr.png";
import { SocketContext } from "../../contexts/SocketContext";

import { toTranslation, SIZE, toPosition } from "./Notation";
// import { reverseFenString } from "./util";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});
type Player = "b" | "w";
type Type = "q" | "r" | "n" | "b" | "k" | "p";
type PlayerPiece = `${Player}${Type}`;
type Pieces = Record<PlayerPiece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
  br: brPiece,
  bp: bpPiece,
  bn: bnPiece,
  bb: bbPiece,
  bq: bqPiece,
  bk: bkPiece,
  wr: wrPiece,
  wn: wnPiece,
  wb: wbPiece,
  wq: wqPiece,
  wk: wkPiece,
  wp: wpPiece,
};

interface PieceProps {
  id: PlayerPiece;
  startPosition: Vector;
  chess: Chess;
  check: boolean;
  onTurn: () => void;
  onTap: () => void;
  enabled: boolean;
}

const Piece = ({ id, startPosition, flip, chess, check, onTurn, onTap, enabled }: PieceProps) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);
  const socket = useContext(SocketContext);
  const movePiece = useCallback(
    (to: Position) => {
      // Uses chess.js library to check for moves that are valid and enables
      // a piece to be moved then transfers turn to other player
      const moves = chess.moves({ verbose: true });
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const move = moves.find((m) => m.from === from && m.to === to);
      const { x, y } = toTranslation(move ? move.to : from);
      translateX.value = withTiming(x, {}, () => {
        offsetX.value = translateX.value;
      });
      translateY.value = withTiming(y, {}, () => {
        offsetY.value = translateY.value;
        isGestureActive.value = false;
      });
      if (move) {
        chess.move({ from, to });
        socket.emit("send chess move", chess.fen());
        // Hack to ensure visual state updates (e.g. check)
        chess.load(chess.fen());
        onTurn();
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = offsetX.value + translationX * (flip ? -1 : 1);
      translateY.value = offsetY.value + translationY * (flip ? -1 : 1);
    },
    onEnd: () => {
      runOnJS(movePiece)(toPosition({ x: translateX.value, y: translateY.value }));
    },
  });
  const tapRef = createRef();
  const panRef = createRef();

  const hasGlow = id === `${check}k`;
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: flip ? 7 * SIZE - translateX.value : translateX.value },
      { translateY: flip ? 7 * SIZE - translateY.value : translateY.value },
    ],
    shadowColor: hasGlow ? "#ff3f3f" : "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: hasGlow ? 1 : 0.2,
    shadowRadius: hasGlow ? 6 : 3,
  }));

  return (
    <TapGestureHandler ref={tapRef} onHandlerStateChange={onTap} simultaneousHandlers={panRef}>
      <Animated.View style={style}>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onGestureEvent}
          enabled={enabled}
          simultaneousHandlers={tapRef}
        >
          <Animated.View>
            <Image source={PIECES[id]} style={styles.piece} />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default Piece;
