import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

const UserBadge = ({ user }) => (
  <View style={styles.userBadge}>
    <Image 
      source={user.profileUrl}
      style={styles.userImage}
      accessibilityLabel={`Foto de ${user.username}`}
    />
    <Text style={styles.username}>{user.username}</Text>
  </View>
);

export default function ChatRoomHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => router.back()}
              accessibilityLabel="Voltar"
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <UserBadge user={user} />
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Ionicons name="call" size={hp(2.8)} color="#737373" />
            <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
          </View>
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  userImage: {
    height: hp(4.5),
    aspectRatio: 1,
    borderRadius: 100
  },
  username: {
    fontSize: hp(2.5),
    color: '#404040',
    fontWeight: '500'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32
  }
});