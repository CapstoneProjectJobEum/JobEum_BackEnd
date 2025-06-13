import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import COLORS from '../../constants/colors';

const JobManagementScreen = () => {
    const navigation = useNavigation();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://10.106.2.70:4000/api/jobs');
                setJobs(res.data);
            } catch (err) {
                console.error('채용공고 로딩 실패:', err.message);
            }
        };
        fetchJobs();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.jobItem}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobDescription}>{item.company} - {item.location}</Text>
            <Text style={styles.jobDescription}>마감일: {item.deadline}</Text>
            <Text style={styles.jobDescription}>요약: {item.summary}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddJobScreen')}>
                <Text style={styles.addButtonText}>채용공고 추가하기 +</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={jobs}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: 20 }}
                    ListEmptyComponent={
                        <Text style={{ marginTop: 20, fontSize: 16, color: 'gray' }}>
                            등록된 채용공고가 없습니다.
                        </Text>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    addButton: {
        backgroundColor: COLORS.THEMECOLOR,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    jobItem: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    jobDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default JobManagementScreen;
