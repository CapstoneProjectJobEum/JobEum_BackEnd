import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import IMAGES from '../../assets/images';

import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const NAVER_CLIENT_ID = "zCKaqdtNQODB0ySD7xa2";
const KAKAO_CLIENT_ID = "f66fa4a23f0ac3fa7da62cb954bc6837";
const GOOGLE_CLIENT_ID = "641276637972-emve9u3rj8q64dqsogjmndv9ddcdqgbr.apps.googleusercontent.com";

// 각 플랫폼의 OAuth 엔드포인트
const naverDiscovery = {
    authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
    tokenEndpoint: "https://nid.naver.com/oauth2.0/token",
};

const kakaoDiscovery = {
    authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
    tokenEndpoint: "https://kauth.kakao.com/oauth/token",
};

const googleDiscovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
};


const LoginScreen = () => {
    const navigation = useNavigation();
    const [userType, setUserType] = useState("회원");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const passwordRef = useRef(null);

    const handleLogin = async () => {
        if (!username || !password) {
            alert('아이디와 비밀번호를 모두 입력하세요.');
            return;
        }

        try {
            const response = await fetch('http://10.106.2.70:4000/api/login', { // 서버 주소는 실제 환경에 맞게 변경할것
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("로그인 성공:", result);
                // 예: 토큰 저장
                // await AsyncStorage.setItem('token', result.token);
                navigation.navigate('RouteScreen', { userType }); // ✅ 수정된 줄
            } else {
                alert(result.message || '아이디 또는 비밀번호를 확인하세요.');
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const redirectUri = "https://jobeumapp.com/auth/callback";

    // 네이버
    const [naverRequest, naverResponse, naverPromptAsync] = useAuthRequest(
        {
            clientId: NAVER_CLIENT_ID,
            redirectUri,
            responseType: "code",
            scopes: ["profile"],
            prompt: "login",
            extraParams: { state: "random_state_string" },
        },
        naverDiscovery
    );

    // 카카오
    const [kakaoRequest, kakaoResponse, kakaoPromptAsync] = useAuthRequest(
        {
            clientId: KAKAO_CLIENT_ID,
            redirectUri,
            scopes: ["profile", "account_email"],
            prompt: "login",
            responseType: "code",
        },
        kakaoDiscovery
    );

    // // 구글
    // const [googleRequest, googleResponse, googlePromptAsync] = useAuthRequest(
    //     {
    //         clientId: GOOGLE_CLIENT_ID,
    //         redirectUri,
    //         scopes: ["openid", "profile", "email"],
    //         responseType: "code",
    //         accessType: "offline",
    //         prompt: "consent",
    //     },
    //     googleDiscovery
    // );


    const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
        expoClientId: "641276637972-emve9u3rj8q64dqsogjmndv9ddcdqgbr.apps.googleusercontent.com",
        iosClientId: "641276637972-0qgomj0i743kc7d6gp2ffhjhledi7res.apps.googleusercontent.com",
        androidClientId: "641276637972-h5so46hiaeji5s6kecnq8rddg6hhl56s.apps.googleusercontent.com",
        selectAccount: true,            // 계정 선택 화면 항상 표시
        prompt: 'login',
    });


    // 네이버 로그인 처리
    React.useEffect(() => {
        if (naverResponse?.type === "success") {
            const code = naverResponse.params.code;
            console.log("네이버 로그인 성공, code:", code);

            fetch("https://jobeumapp.com/auth/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("서버 응답:", data);
                    navigation.navigate(SCREENS.MY, { userType });
                })
                .catch((err) => {
                    console.error("서버 오류:", err);
                    alert("네이버 로그인 중 문제가 발생했습니다.");
                });
        }
    }, [naverResponse]);

    // 카카오 로그인 처리
    React.useEffect(() => {
        if (kakaoResponse?.type === "success") {
            const code = kakaoResponse.params.code;
            console.log("카카오 로그인 성공, code:", code);

            fetch("https://jobeumapp.com/auth/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("서버 응답:", data);
                    navigation.navigate(SCREENS.MY, { userType });
                })
                .catch((err) => {
                    console.error("서버 오류:", err);
                    alert("카카오 로그인 중 문제가 발생했습니다.");
                });
        }
    }, [kakaoResponse]);

    // // 구글 로그인 처리
    // React.useEffect(() => {
    //     if (googleResponse?.type === "success") {
    //         const code = googleResponse.params.code;
    //         console.log("구글 로그인 성공, code:", code);

    //         fetch("https://jobeumapp.com/auth/callback", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ code, redirectUri }),
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log("서버 응답:", data);
    //                 navigation.navigate(SCREENS.MY, { userType });
    //             })
    //             .catch((err) => {
    //                 console.error("서버 오류:", err);
    //                 alert("구글 로그인 중 문제가 발생했습니다.");
    //             });
    //     }
    // }, [googleResponse]);

    useEffect(() => {
        if (googleResponse?.type === 'success') {
            const { authentication } = googleResponse;
            console.log('accessToken:', authentication.accessToken);
            // accessToken으로 사용자 정보 fetch 등 추가 작업 가능
        }
    }, [googleResponse]);



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.loginbtn}
                    onPress={() => navigation.navigate("RouteScreen")}
                >
                    <Text style={styles.btnfont}>
                        홈화면 이동 임시 버튼
                    </Text>
                </TouchableOpacity>
                <View style={styles.typeSelector}>
                    <TouchableOpacity
                        style={[
                            styles.typeButton,
                            userType === "회원" && styles.typeButtonSelected,
                        ]}
                        onPress={() => setUserType("회원")}
                        accessibilityLabel="회원 로그인 선택"
                    >
                        <Text
                            style={[
                                styles.typeButtonText,
                                userType === "회원" && styles.typeButtonTextSelected,
                            ]}
                        >
                            회원
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.typeButton,
                            userType === "기업" && styles.typeButtonSelected,
                        ]}
                        onPress={() => setUserType("기업")}
                        accessibilityLabel="기업 로그인 선택"
                    >
                        <Text
                            style={[
                                styles.typeButtonText,
                                userType === "기업" && styles.typeButtonTextSelected,
                            ]}
                        >
                            기업
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginContainer}>
                    {/* 아이디 입력창 */}
                    <TextInput
                        style={styles.input}
                        placeholder="아이디"
                        value={username}
                        onChangeText={setUsername}
                        returnKeyType="next"
                        autoCapitalize="none"
                        accessibilityLabel="아이디 입력"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    {/* 비밀번호 입력창 (아이콘 공간 확보) */}
                    <View style={styles.passwordWrapper}>
                        <TextInput
                            ref={passwordRef}
                            style={[styles.input, { paddingRight: 45 }]}
                            placeholder="비밀번호"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                            returnKeyType="done"
                            accessibilityLabel="비밀번호 입력"
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                        {/* 포커스 있을 때만 아이콘 보임 */}
                        {passwordFocused && (
                            <TouchableOpacity
                                style={styles.iconBtn}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                accessibilityLabel={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                            >
                                <Ionicons
                                    name={isPasswordVisible ? "eye" : "eye-off"}
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* 로그인 버튼 */}
                    <TouchableOpacity
                        style={styles.loginbtn}
                        onPress={handleLogin}
                        accessibilityLabel={`${userType} 로그인 버튼`}
                    >
                        <Text style={styles.btnfont}>
                            {userType === "회원" ? "회원 로그인" : "기업 로그인"}
                        </Text>
                    </TouchableOpacity>


                </View>

                <View style={styles.authLinksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("FindIdScreen")}>
                        <Text style={styles.authLinkText}>아이디 찾기</Text>
                    </TouchableOpacity>

                    <Text style={styles.separator}>|</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("FindPasswordScreen")}>
                        <Text style={styles.authLinkText}>비밀번호 찾기</Text>
                    </TouchableOpacity>

                    <Text style={styles.separator}>|</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
                        <Text style={styles.authLinkText}>회원가입</Text>
                    </TouchableOpacity>
                </View>



                {/* 소셜 로그인 버튼 */}
                <View style={styles.socialIconContainer}>
                    <TouchableOpacity
                        style={styles.socialImageButton}
                        disabled={!naverRequest}
                        onPress={() => naverPromptAsync()}
                        accessibilityLabel="네이버 로그인"
                    >
                        <Image
                            source={IMAGES.NAVER}
                            style={styles.socialIconImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialImageButton}
                        disabled={!kakaoRequest}
                        onPress={() => kakaoPromptAsync()}
                        accessibilityLabel="카카오 로그인"
                    >
                        <Image
                            source={IMAGES.KAKAO}
                            style={styles.socialIconImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialImageButton}
                        disabled={!googleRequest}
                        onPress={() => googlePromptAsync()}
                        accessibilityLabel="구글 로그인"
                    >
                        <Image
                            source={IMAGES.GOOGLE}
                            style={styles.socialIconImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingBottom: 30,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    typeSelector: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 120,
    },
    typeButton: {
        paddingVertical: 10,
        paddingHorizontal: wp('17%'),
        borderBottomWidth: 2,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    typeButtonSelected: {
        borderBottomColor: COLORS.THEMECOLOR,
    },
    typeButtonText: {
        fontSize: 16,
        color: "#555",
    },
    typeButtonTextSelected: {
        color: COLORS.THEMECOLOR,
        fontWeight: "600",
    },



    loginContainer: {
        flexDirection: "column",
        marginBottom: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        backgroundColor: "#F7F7F7",
        width: wp('80%'),
        height: 45,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },

    passwordWrapper: {
        width: wp('80%'),
        height: 45,
        position: "relative",
        marginBottom: 15,
    },
    iconBtn: {
        position: "absolute",
        right: 15,
        transform: [{ translateY: -10 }],
        top: "50%",
    },

    loginbtn: {
        backgroundColor: COLORS.THEMECOLOR,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        width: wp('80%'),
    },
    btnfont: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },


    authLinksContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    authLinkText: {
        color: "black",
        fontSize: 14,
        paddingHorizontal: 6,
    },
    separator: {
        color: "#999",
        fontSize: 14,
    },
    socialIconContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        gap: 20,
    },
    socialImageButton: {
        width: 30,
        height: 30,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    socialIconImage: {
        width: 40,
        height: 40,
    },
});

