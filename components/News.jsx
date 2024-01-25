// NewsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ArticleDetailScreen = ({ route, navigation }) => {
  const { article } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.detailContainer}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backContainer}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>{article.title}</Text>
      <Text style={styles.byline}>{article.byline}</Text>
      <Text style={styles.detailText}>{article.abstract}</Text>
    </View>
  );
};

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=35avElSq9kS33FXvLysf0p96hJqgKJ0v'
        );

        if (response.data.results) {
          setNews(response.data.results);
        } else {
          console.error('Failed to fetch news. Response data structure is unexpected.');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {news ? (
        <View>
          {news.map((article) => (
            <TouchableOpacity
              key={article.url}
              onPress={() => navigation.navigate('ArticleDetail', { article })}
              style={styles.articleContainer}
            >
              <View>
                <Text style={styles.articleTitle}>{article.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading news...</Text>
      )}
    </ScrollView>
  );
};

const Stack = createStackNavigator();

const NewsStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="News">
        <Stack.Screen
          name="News"
          component={NewsScreen}
          options={{ title: 'News', headerShown: false }}
        />
        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backContainer: {
    marginBottom: 15,
  },
  articleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  detailContainer: {
    padding: 16,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  byline: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
  },
  text: {
    fontSize: 16,
    color: 'blue',
  },
});

export default NewsStack;
