import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";


export default function Gameover(isGameOver) {
    console.log(isGameOver)
    if (isGameOver) {
        return <Text style = {{color: 'azure'}}>Gameover</Text>
    }
    return <Text style = {{color: 'azure'}}>Game not over</Text>
}
