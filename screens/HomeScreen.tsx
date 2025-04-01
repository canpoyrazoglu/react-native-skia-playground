import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import exampleShaders, {
  EXAMPLE_THUMBS,
  ShaderExample,
} from '../examples/shaders';
import { useNavigate } from '../hooks/navigation';

function HomeScreen() {
  const navigate = useNavigate();

  const renderItem: ListRenderItem<ShaderExample> = ({ item }) => {
    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          navigate('Shader', {
            initialShader: item.shader,
          });
        }}>
        <Image source={EXAMPLE_THUMBS[item.thumb]} style={styles.itemThumb} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <FlatList
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        data={exampleShaders}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemThumb: {
    width: 50,
    height: 60,
    borderRadius: 8,
    marginRight: 20,
  },
  itemTitle: {
    fontSize: 18,
    color: '#ddb',
    fontWeight: '400',
  },
  list: {
    paddingVertical: 20,
  },
  itemDescription: {
    color: '#aaa',
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
  },
});

export default HomeScreen;
