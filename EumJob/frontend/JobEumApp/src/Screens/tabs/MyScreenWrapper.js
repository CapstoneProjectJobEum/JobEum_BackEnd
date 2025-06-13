import React from 'react';
import MemberMyScreen from './MemberMyScreen'; // 회원용 화면 컴포넌트
import CompanyMyScreen from './CompanyMyScreen'; // 기업용 화면 컴포넌트

const MyScreenWrapper = ({ route, navigation }) => {
    // const { userType } = route.params || {};
    const { userType = '회원' } = route.params || {};  // 기본값 '회원'
    // const { userType = '기업' } = route.params || {};  // 기본값 '기업'


    if (userType === '회원') {
        return <MemberMyScreen />;
    }

    return <CompanyMyScreen />;
};

export default MyScreenWrapper;
