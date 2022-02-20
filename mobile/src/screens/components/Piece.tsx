import { Chess, Position } from "chess.js";
import React, { useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";

// import black piece image assets
import bbPiece from "../../../assets/bb.png";
import bkPiece from "../../../assets/bk.png";
import bnPiece from "../../../assets/bn.png";
import bpPiece from "../../../assets/bp.png";
import bqPiece from "../../../assets/bq.png";
import brPiece from "../../../assets/br.png";
import wbPiece from "../../../assets/wb.png";
import wkPiece from "../../../assets/wk.png";
import wnPiece from "../../../assets/wn.png";
import wpPiece from "../../../assets/wp.png";
import wqPiece from "../../../assets/wq.png";
import wrPiece from "../../../assets/wr.png";

import { toTranslation, SIZE, toPosition } from "./Notation.ts";

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
  onTurn: () => void;
  enabled: boolean;
}

function Piece({ id, startPosition, chess, onTurn, enabled }: PieceProps) {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);
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
      translateX.value = offsetX.value + translationX;
      translateY.value = offsetY.value + translationY;
    },
    onEnd: () => {
      runOnJS(movePiece)(toPosition({ x: translateX.value, y: translateY.value }));
    },
  });
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));
  const original = useAnimatedStyle(() => ({
    position: "absolute",
    width: SIZE,
    height: SIZE,
    zIndex: 0,
    backgroundColor: isGestureActive.value ? "rgba(255, 255, 0, 0.5)" : "transparent",
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));
  const underlay = useAnimatedStyle(() => {
    const position = toPosition({ x: translateX.value, y: translateY.value });
    const translation = toTranslation(position);
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value ? "rgba(255, 255, 0, 0.5)" : "transparent",
      transform: [{ translateX: translation.x }, { translateY: translation.y }],
    };
  });
  return (
    <>
      <Animated.View style={original} />
      <Animated.View style={underlay} />
      <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
        <Animated.View style={style}>
          <Image source={PIECES[id]} style={styles.piece} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

export default Piece;
