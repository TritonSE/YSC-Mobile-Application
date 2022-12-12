import { Modal, Image, Pressable, View } from "react-native";

import bbPiece from "../../../assets/piece_images/bb.png";
import bnPiece from "../../../assets/piece_images/bn.png";
import bqPiece from "../../../assets/piece_images/bq.png";
import brPiece from "../../../assets/piece_images/br.png";
import wbPiece from "../../../assets/piece_images/wb.png";
import wnPiece from "../../../assets/piece_images/wn.png";
import wqPiece from "../../../assets/piece_images/wq.png";
import wrPiece from "../../../assets/piece_images/wr.png";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

const PIECES = {
  w: {
    q: wqPiece,
    r: wrPiece,
    b: wbPiece,
    n: wnPiece,
  },
  b: {
    q: bqPiece,
    r: brPiece,
    b: bbPiece,
    n: bnPiece,
  },
};

const styles = {
  piece: {
    width: 50,
    height: 50,
  },
  modal: {
    backgroundColor: "white",
    width: 230,
    height: 121,
    borderWidth: 4,
    borderColor: "#96C957",
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    flexDirection: "row",
  },
};

const Piece = ({ color, type, setValue }) => (
  <Pressable onPress={() => setValue(type)}>
    <Image source={PIECES[color][type]} style={styles.piece} />
  </Pressable>
);

const Promotion = ({ color, setValue }) => (
  <Modal animationType="slide" transparent>
    <View style={PopupStyleSheet.centeredView}>
      <View style={styles.modal}>
        <Piece color={color} type="q" setValue={setValue} />
        <Piece color={color} type="r" setValue={setValue} />
        <Piece color={color} type="b" setValue={setValue} />
        <Piece color={color} type="n" setValue={setValue} />
        <Piece color={color} type="p" setValue={setValue} />
      </View>
    </View>
  </Modal>
);

export default Promotion;
