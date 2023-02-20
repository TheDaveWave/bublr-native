import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  FlatList,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";

import { testData } from "../../test-data/fountain-data";
import ListItem from "./ListItem";

// console.log("test data:", testData);

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ListContainer() {
  const { height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = event.translationY + context.translateY;
      // Adds a maximum value the sheet can not move past so it does not pan past the screen.
      translateY.value = Math.max(translateY.value, headerHeight / 4);
    },
    onEnd: (event, context) => {
      const halfScreenHeight = height / 2;
      // Create snap points for the bottom sheet to move to a specified part of the screen,
      // if conditions are met.
      if (
        translateY.value > headerHeight * 1.2 &&
        translateY.value < halfScreenHeight
      ) {
        translateY.value = height - tabBarHeight * 2.1;
      } else if (
        translateY.value < height - tabBarHeight * 2.5 &&
        translateY.value > halfScreenHeight
      ) {
        translateY.value = headerHeight / 4;
      } else {
        translateY.value = height - tabBarHeight * 2.1;
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(translateY.value, {
            damping: 20,
            mass: 0.5,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    translateY.value = headerHeight / 4;
  }, []);

  function handleSroll(event) {
    let offsetY = event.nativeEvent.contentOffset.y / 1;
    // How to make this if statement utilize the onDrag gesture?
    if (offsetY >= 0) return;
    if (offsetY < -5000 && offsetY < headerHeight * 1.2) {
      translateY.value = withSpring(translateY.value - offsetY, {
        damping: 20,
        mass: 0.5,
      });
    }
    const halfScreenHeight = height / 2;
    // Create snap points for the bottom sheet to move to a specified part of the screen,
    // if conditions are met.
    if (
      translateY.value > headerHeight * 1.2 &&
      translateY.value < halfScreenHeight
    ) {
      translateY.value = height - tabBarHeight * 2.1;
    } else if (
      translateY.value < height - tabBarHeight * 2.5 &&
      translateY.value > halfScreenHeight
    ) {
      translateY.value = headerHeight / 4;
    } else {
      translateY.value = height - tabBarHeight * 2.1;
    }
    console.log(offsetY);
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onDrag}>
          <AnimatedView
            style={[
              styles.slide,
              { height: height, bottom: headerHeight / 2 },
              containerStyle,
            ]}
          >
            <AnimatedView style={styles.listContainer}>
              <NativeViewGestureHandler style={[containerStyle]}>
                <FlatList
                  onScroll={(event) => handleSroll(event)}
                  // onGestureEvent={onDrag}
                  // ref={(ref) => console.log(ref)}
                  keyExtractor={(ftn) => ftn.id}
                  data={testData}
                  renderItem={({ item }) => <ListItem fountain={item} />}
                  style={[styles.list, { height: height }]}
                />
              </NativeViewGestureHandler>
            </AnimatedView>
          </AnimatedView>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    // flex: 1,
    // backgroundColor: "green",
  },
  slide: {
    width: "100%",
    backgroundColor: "blue",
    // alignSelf: "center",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  listContainer: {
    // flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    // justifyContent: "center",
  },
  list: {
    // height: "80%",
    width: "80%",
    backgroundColor: "yellow",
  },
});
