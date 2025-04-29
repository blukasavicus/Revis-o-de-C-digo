import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const MenuItem = ({ 
  text, 
  action, 
  value, 
  icon, 
  textStyle = '' 
}) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <Pressable 
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.pressedItem
        ]}
      >
        <View style={styles.menuContent}>
          <Text style={[styles.menuText, textStyle]}>
            {text}
          </Text>
          {icon}
        </View>
      </Pressable>
    </MenuOption>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  pressedItem: {
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  menuContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuText: {
    fontSize: hp(1.7),
    fontWeight: '600',
    color: '#525252'
  }
});