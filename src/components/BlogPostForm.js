import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValue }) => {
  const [title, setTitle] = useState(initialValue.title);
  const [post, setPost] = useState(initialValue.content);
  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        onChange={({ nativeEvent }) => setTitle(nativeEvent.text)}
        value={title}
        style={styles.input}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        value={post}
        onChangeText={(text) => setPost(text)}
        style={styles.input}
      />
      <Button title="Add Blog Post" onPress={() => onSubmit(title, post)} />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValue: {
    title: "",
    content: "",
  },
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#000",
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default BlogPostForm;
