import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import COLORS from "../../constants/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import JobManagementScreen from '../Pages/JobManagementScreen';

const buttonData = [
    'MY홈',
    '채용공고 관리',
    '지원자 현황',
    '기업 정보 수정',
    '설정',
];

const CompanyMyScreen = () => {
    const [selectedTab, setSelectedTab] = useState('MY홈');

    const renderButton = (label) => {
        const isSelected = selectedTab === label;
        return (
            <TouchableOpacity
                key={label}
                style={[
                    styles.scrollButton,
                    isSelected && { borderColor: COLORS.THEMECOLOR }
                ]}
                onPress={() => setSelectedTab(label)}
            >
                <Text
                    style={[
                        styles.scrollButtonText,
                        isSelected && { color: COLORS.THEMECOLOR, fontWeight: 'bold' }
                    ]}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderContent = () => {
        if (selectedTab === '채용공고 관리') {
            // FlatList 있는 화면은 ScrollView 없이 바로 렌더링
            return <JobManagementScreen />;
        }

        let contentText = '';
        switch (selectedTab) {
            case 'MY홈':
                contentText = 'MY홈 콘텐츠';
                break;
            case '지원자 현황':
                contentText = '지원자 현황 콘텐츠';
                break;
            case '기업 정보 수정':
                contentText = '기업 정보 수정 콘텐츠';
                break;
            case '설정':
                contentText = '설정 콘텐츠';
                break;
            default:
                contentText = '';
        }

        return (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.pageContent}>{contentText}</Text>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.fixedBar}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalBarContent}
                >
                    {buttonData.map(renderButton)}
                </ScrollView>
            </View>

            <View style={styles.contentWrapper}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

export default CompanyMyScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fixedBar: {
        backgroundColor: '#fff',
        paddingVertical: hp('1%'),
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        zIndex: 10,
    },
    horizontalBarContent: {
        paddingHorizontal: wp('5%'),
        flexDirection: 'row',
    },
    scrollButton: {
        marginRight: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    scrollButtonText: {
        fontSize: wp('3.5%'),
        color: 'black',
    },
    contentWrapper: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
    },
    pageContent: {
        fontSize: 16,
        color: '#333',
    },
});
