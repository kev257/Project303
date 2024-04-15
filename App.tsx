/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {Text, View, SafeAreaView} from 'react-native';
import NavBar from './NavBar';
import ListScreen from './screens/ListScreen';
const App = () => {



return(
<View>
<ListScreen/>
<NavBar />
</View>

);
};

export default App;


