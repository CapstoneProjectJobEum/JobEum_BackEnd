import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window')
export default function App() {
    return (
        <View style={styles.container}>
            {/*header*/}
            <View style={styles.header} />

            {/*main*/}
            <View style={styles.main}>
                <View style={styles.section1} />
                <View style={styles.section2}>
                    <Text style={styles.content}>After the package has installed, when application loads (in real device and/or emulator), it detects the screen's width and height. I.e. for Samsung A5 2017 model it detects width: 360DP and height: 640DP (these are the values without taking into account the device's scale factor).</Text>
                </View>
            </View>

            {/*footer*/}
            <View style={styles.footer} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: hp(100),
        backgroundColor: 'yellow',
    },
    header: {
        height: hp(15),
        backgroundColor: 'tomato',
    },
    main: {
        height: hp(70),
        display: 'flex',
        // flexDirection: 'row'
    },
    section1: {
        height: wp(50),
        backgroundColor: 'orange'
    },
    section2: {
        height: wp(50),
        backgroundColor: 'skyblue'
    },
    footer: {
        height: hp(15),
        backgroundColor: 'lightgreen'
    },
    content: {
        fontSize: hp(2)

    },

});
