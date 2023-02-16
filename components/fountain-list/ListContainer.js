import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect } from "react";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ListContainer() {
  const { height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const translateY = useSharedValue(0);

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = event.translationY + context.translateY;
      // translateY.value = Math.max(translateY.value, (headerHeight - height));
      translateY.value = Math.max(translateY.value, headerHeight / 4);
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(translateY.value),
        },
      ],
    };
  });

  useEffect(() => {
    translateY.value = headerHeight / 4;
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView
          style={[
            styles.slide,
            { height: height, bottom: headerHeight / 2 },
            containerStyle,
          ]}
        ></AnimatedView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  slide: {
    // height: "150%",
    width: "100%",
    backgroundColor: "blue",
    alignSelf: "center",
    borderRadius: 25,
  },
});
