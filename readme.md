### Funcionamento

Context.js:
Gerencia autenticação global usando Firebase Auth + Firestore
Fornece: estado do usuário (user, isAuthenticated);
Métodos: login(), register(), logout();
Atualiza dados do usuário automaticamente ao fazer login


ChatList.js:
Renderiza lista de chats usando FlatList
Recebe array de users e currentUser como props
Cada item é renderizado pelo componente ChatItem

ChatRoomHeader.js:
Renderiza lista de chats usando FlatList
Recebe array de users e currentUser como props
Cada item é renderizado pelo componente ChatItem


CustomMenuItems.js:
Item reutilizável para menus popup

Aceita: text, action, icon como props

### Boas Práticas

Context.js
```javascript
// 1. Context API organizado
export const AuthContext = createContext();

// 2. Cleanup do listener no useEffect
useEffect(() => {
  const unsub = onAuthStateChanged(auth, user => { /*...*/ });
  return unsub; // 
}, []);

// 3. Tratamento de erros com mensagens amigáveis
catch(e) {
  if(e.message.includes('invalid-email')) return 'E-mail inválido';
}
```

ChatList.js
```javascript
// 1. Uso eficiente de FlatList
<FlatList
  data={users}
  keyExtractor={item => item.id} // 
  renderItem={({item}) => <ChatItem {...item}/>}
/>

// 2. Estilização com NativeWind
<View className="flex-1 bg-white">
```

ChatRoomHeader.js
```javascript
// 1. Ícones otimizados do Expo
<Ionicons name="call" size={hp(2.8)} color="#737373" />

// 2. Layout responsivo
const styles = {
  userImage: {
    height: hp(4.5), //  heightPercentageToDP
    aspectRatio: 1
  }
};
```

CustomMenuItems.js
```javascript
// 1. Interface simples
<MenuOption onSelect={action}>
  <View className="flex-row justify-between">
    <Text>{text}</Text>
    {icon}
  </View>
</MenuOption>
```

### Refatoração

Context.js
```javascript
// 1. Separar em serviços
const authService = {
  login: async (email, pass) => { /* ... */ },
  register: async (userData) => { /* ... */ }
};

// 2. Adicionar TypeScript
interface User {
  uid: string;
  email?: string;
  username?: string;
}

// 3. Melhorar tratamento de erros
const errorMap = {
  'auth/invalid-email': 'E-mail inválido',
  'auth/user-not-found': 'Usuário não existe'
};
```


ChatList.js
```javascript
// 1. Adicionar paginação
const loadMore = () => {
  if(!loading) fetchMoreUsers();
};

// 2. Melhorar tipagem (TypeScript)
interface ChatUser {
  id: string;
  name: string;
  lastMessage?: string;
}

// 3. Componente memoizado
const MemoizedChatItem = React.memo(ChatItem);
```


ChatRoomHeader.js
```javascript
// 1. Extrair componentes menores
const HeaderActions = () => (
  <View style={styles.actions}>
    <CallButton />
    <VideoCallButton />
  </View>
);

// 2. Adicionar acessibilidade
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Voltar"
>
```


CustomMenuItems.js
```javascript
// 1. Adicionar TypeScript
interface MenuItemProps {
  text: string;
  action: () => void;
  icon?: React.ReactNode;
  color?: string;
}

// 2. Melhorar feedback visual
<Pressable 
  style={({pressed}) => ({
    opacity: pressed ? 0.5 : 1
  })}
```
 
