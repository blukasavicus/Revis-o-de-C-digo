import { View, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';
import EmptyState from './EmptyState';

export default function ChatList({ users, currentUser }) {
  const router = useRouter();

  // Renderiza cada item da lista
  const renderItem = useCallback(({ item }) => (
    <ChatItem 
      item={item}
      currentUser={currentUser}
      onPress={() => router.push(`/chat/${item.id}`)}
    />
  ), []);

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={users.length === 0 && { flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}