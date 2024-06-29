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
        duration: 15000,
        useNativeDriver: true,
      }).start(() => {
        //setMessages(messages => messages.filter(message => message.id !== newMessage.id));
      });
    }
  };

  const handleCopyToClipboard = () => {
    const allText = messages.map((msg) => msg.text).join("\n");
    copy(allText);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}
           showsVerticalScrollIndicator={false}
      >
        
        {messages.map((msg) => (
          <Animated.View
            key={msg.id}
            style={{ ...styles.message, opacity: msg.fadeAnim }}
          >
            <Text>{msg.text}</Text>
          </Animated.View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
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
        <Button style={styles.copyButton} onPress={() => handleCopyToClipboard()}>
          {/* You can use any clipboard icon here */}
          <Text>📋</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: "column",
    backgroundColor: "#ddd",
    padding: 24,
  },
  messagesContainer: {
    flex: 4, // 80% of vertical space
    flexDirection: 'column-reverse',
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  message: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
    borderRadius: 4,
    animation: "fadeOut 15s forwards",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '10vh',
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 8,
    flex: 1,
    backgroundColor: "#999",
    paddingHorizontal: 8,
  },
  copyButton: {
    width: 10,
    padding: 8,
  }
});

export default App;
