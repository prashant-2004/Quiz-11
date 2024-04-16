import { View } from "react-native";

const Dark_Mode = ({darkMode})=> {
    const [darkMode, setDarkMode] = useState(false);
  
    // AFTER DARK-MODE BUTTON CLICKED..-->>
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
  
    return(
        <View>
           
            {/* Dark Mode Toggle Button */}
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleDarkMode}
            >
                <Image
                source={!darkMode ? require('../assets/moon-icon.png') : require('../assets/sun-icon.png')}
                style={styles.toggleIcon} />
            </TouchableOpacity>

        </View>
    );
};

export default Dark_Mode;