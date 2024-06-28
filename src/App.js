import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  Animated,
} from "react-native";
import copy from "copy-to-clipboard";

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  const handleTextSubmit = () => {
    if (text.trim()) {
      const newMessage = {
        text,
        id: Date.now(),
        fadeAnim: new Animated.Value(1),
      };
      setMessages([...messages, newMessage]);
      setText("");
      inputRef.current.focus(); // Retain focus on the text input
      Animated.timing(newMessage.fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {});
    }
  };

  const handleCopyToClipboard = () => {
    const allText = messages.map((msg) => msg.text).join("\n");
    copy(allText);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <Animated.View
            key={msg.id}
            style={{ ...styles.message, opacity: msg.fadeAnim }}
          >
            <Text>{msg.text}</Text>
          </Animated.View>
        ))}
      </ScrollView>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleTextSubmit}
        placeholder="Enter text..."
        returnKeyType="done"
        blurOnSubmit={false} // Prevent the input from losing focus on submit
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ddd",
    padding: 10,
  },
  messagesContainer: {
    flex: 4, // 80% of vertical space
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  message: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
    borderRadius: 4,
    animation: "fadeOut 3s forwards",
  },
  input: {
    flex: 1, // 20% of vertical space
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,

    backgroundColor: "#999",
    paddingHorizontal: 8,
  },
});

export default App;
