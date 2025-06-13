import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const JobDetailScreen = ({ route }) => {
    const { job } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.company}>{job.company}</Text>
                <Text style={styles.location}>{job.location}</Text>

                {/* 이미지 (옵션) */}
                {job.image ? (
                    <Image source={{ uri: job.image }} style={styles.image} />
                ) : null}

                {/* 마감일, 경력, 학력 */}
                <View style={styles.infoRow}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>마감: {job.deadline}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>경력: {job.career}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>학력: {job.education}</Text>
                    </View>
                </View>

                {/* 채용 조건 요약 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>채용 조건 요약</Text>
                    <Text style={styles.text}>{job.summary || '정보가 없습니다.'}</Text>
                </View>

                {/* 채용 상세 내용 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>채용 상세 내용</Text>
                    <Text style={styles.text}>{job.description || '정보가 없습니다.'}</Text>
                </View>

                {/* 조건 (이런 분이면 좋아요) */}
                {job.conditions ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>조건</Text>
                        <Text style={styles.text}>{job.conditions}</Text>
                    </View>
                ) : null}
            </ScrollView>

            {/* 하단 고정 버튼 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>스크랩</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.applyButton]}>
                    <Text style={styles.buttonText}>지원하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default JobDetailScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 120, // 버튼 높이 + 여백
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#111',
    },
    company: {
        fontSize: 18,
        marginBottom: 2,
        color: '#555',
    },
    location: {
        fontSize: 16,
        marginBottom: 12,
        color: '#666',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#eee',
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
        gap: 10,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 10,
        marginBottom: 6,
    },
    tagText: {
        fontSize: 14,
        color: '#444',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#222',
    },
    text: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: width,
    },
    button: {
        flex: 1,
        backgroundColor: '#999',
        marginHorizontal: 6,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
