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
import PersonalInfoForm from '../Pages/PersonalInfoForm';

const buttonData = [
    'MY홈', '이력서 관리', '최근 본 공고', '지원 현황', '관심 공고', '관심 기업', '맞춤정보설정', '설정'
];

const MemberMyScreen = () => {
    const [selectedTab, setSelectedTab] = useState('MY홈'); // 기본 선택 탭 지정

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
        switch (selectedTab) {
            case 'MY홈':
                return <Text style={styles.pageContent}>MY홈 콘텐츠</Text>;
            case '이력서 관리':
                return <Text style={styles.pageContent}>이력서 관리 콘텐츠</Text>;
            case '최근 본 공고':
                return <Text style={styles.pageContent}>최근 본 공고 콘텐츠</Text>;
            case '지원 현황':
                return <Text style={styles.pageContent}>지원 현황 콘텐츠</Text>;
            case '관심 공고':
                return <Text style={styles.pageContent}>관심 공고 콘텐츠</Text>;
            case '관심 기업':
                return <Text style={styles.pageContent}>관심 기업 콘텐츠</Text>;
            case '맞춤정보설정':
                return <PersonalInfoForm />;
            case '설정':
                return <Text style={styles.pageContent}>설정 콘텐츠</Text>;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* 고정된 가로 스크롤 버튼 바 */}
            <View style={styles.fixedBar}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalBarContent}
                >
                    {buttonData.map(renderButton)}
                </ScrollView>
            </View>

            {/* 스크롤 가능한 콘텐츠 영역 */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contentWrapper}>
                    {renderContent()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MemberMyScreen;

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
    pageContent: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 20,
    },
});
