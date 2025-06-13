import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import axios from "axios";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState("회원");
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    birth: "",
    gender: "",
    email: "",
    phone: "",
    verifyCode: "",
    company: "",
    bizNumber: "",
    manager: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // 회원가입 요청 함수
  const handleSignUp = async () => {
    // 간단한 유효성 검사 예시
    if (!form.username || !form.password) {
      Alert.alert("입력 오류", "아이디와 비밀번호는 필수입니다.");
      return;
    }

    setLoading(true);

    try {
      // 백엔드 API 주소로 변경해주세요!
      const apiUrl = "http://10.106.2.70:4000/api/signup"; //<-- 실제 서버 주소로 변경할것

      // 서버에 보낼 데이터 구성
      const postData = {
        userType,
        username: form.username,
        password: form.password,
        email: form.email,
        phone: form.phone,
      };

      if (userType === "회원") {
        postData.name = form.name;
        postData.birth = form.birth;
        postData.gender = form.gender;
      } else {
        postData.company = form.company;
        postData.bizNumber = form.bizNumber;
        postData.manager = form.manager;
      }

      // 실제 요청
      const response = await axios.post(apiUrl, postData);

      if (response.status === 200 || response.status === 201) {
        Alert.alert("가입 성공", "회원가입이 완료되었습니다.", [
          { text: "확인", onPress: () => navigation.navigate("LoginScreen") },
        ]);
      } else {
        Alert.alert("가입 실패", "서버 응답 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("가입 실패", error.response?.data?.message || error.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              userType === "회원" && styles.typeButtonSelected,
            ]}
            onPress={() => setUserType("회원")}
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
        </View> */}
        <View style={{ marginTop: 40 }}></View>
        <View style={styles.formContainer}>
          <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              paddingBottom: 10,
            }}
          >
            <View style={styles.inputRow}>
              <Text style={styles.label}>아이디</Text>
              <TextInput
                style={styles.inputField}
                placeholder="8~16자 영문소문자, 숫자"
                value={form.username}
                onChangeText={(text) => handleChange("username", text)}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.inputField}
                placeholder="8~16자 영문, 숫자, 특수문자"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => handleChange("password", text)}
                autoCapitalize="none"
              />
            </View>
          </View>

          {userType === "회원" ? (
            <>
              <View style={styles.inputRow}>
                <Text style={styles.label}>이름</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="실명을 입력해 주세요"
                  value={form.name}
                  onChangeText={(text) => handleChange("name", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>생년월일</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="예) 20000131"
                  keyboardType="numeric"
                  value={form.birth}
                  onChangeText={(text) => handleChange("birth", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>성별</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderBtn,
                      form.gender === "남자" && styles.genderBtnSelected,
                    ]}
                    onPress={() => handleChange("gender", "남자")}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        form.gender === "남자" && styles.genderTextSelected,
                      ]}
                    >
                      남자
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderBtn,
                      form.gender === "여자" && styles.genderBtnSelected,
                    ]}
                    onPress={() => handleChange("gender", "여자")}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        form.gender === "여자" && styles.genderTextSelected,
                      ]}
                    >
                      여자
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputRow}>
                <Text style={styles.label}>기업명</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="기업명을 입력해 주세요"
                  value={form.company}
                  onChangeText={(text) => handleChange("company", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>사업자번호</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="숫자만 입력해 주세요"
                  keyboardType="numeric"
                  value={form.bizNumber}
                  onChangeText={(text) => handleChange("bizNumber", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>담당자</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="실명을 입력해 주세요"
                  value={form.manager}
                  onChangeText={(text) => handleChange("manager", text)}
                />
              </View>
            </>
          )}

          <View style={styles.inputRow}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.inputField}
              placeholder="example@email.com"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>휴대폰 번호</Text>
            <TextInput
              style={[styles.inputField, { flex: 1 }]}
              placeholder="- 제외 숫자만 입력"
              keyboardType="numeric"
              value={form.phone}
              onChangeText={(text) => handleChange("phone", text)}
            />
            <TouchableOpacity style={styles.smallButton} onPress={() => Alert.alert('인증번호 발송 기능 준비중')}>
              <Text style={styles.smallButtonText}>인증번호 발송</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>인증번호</Text>
            <TextInput
              style={[styles.inputField, { flex: 1 }]}
              placeholder="번호 입력"
              keyboardType="numeric"
              value={form.verifyCode}
              onChangeText={(text) => handleChange("verifyCode", text)}
            />
            <TouchableOpacity style={styles.smallButton} onPress={() => Alert.alert('인증번호 확인 기능 준비중')}>
              <Text style={styles.smallButtonText}>확인</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.signupBtn, loading && { backgroundColor: "#aaa" }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.signupText}>{loading ? "가입 중..." : "가입하기"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    marginTop: 10,
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: wp("17%"),
    borderBottomWidth: 2,
    borderColor: "#ccc",
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
  formContainer: {
    width: wp("85%"),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  label: {
    width: 65,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 5,
  },
  inputField: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  genderBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  genderBtnSelected: {
    borderColor: COLORS.THEMECOLOR,
  },
  genderText: {
    color: "#333",
    fontSize: 14,
  },
  genderTextSelected: {
    color: COLORS.THEMECOLOR,
    fontWeight: "bold",
  },
  smallButton: {
    borderWidth: 1,
    borderColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  smallButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 13,
  },
  signupBtn: {
    backgroundColor: COLORS.THEMECOLOR,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
