import {Link, useRouter} from "expo-router";
import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/Components/SearchBar";
import {useContext} from "react";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/Components/MovieCard";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/Components/TrendingCard";

export default function Index() {

    const router = useRouter();

    const {
        data: trendingMovies,
        loading: loadingTrending,
        error: errorTrending
    } = useFetch(getTrendingMovies)

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({query: ''}));



    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0"/>
            <ScrollView className="flex-1 px-5">

                <Image
                    source={icons.logo}
                    className="w-12 h-10 mt-20 mb-5 mx-auto"
                    // @ts-ignore
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        minHeight: "100%",
                        paddingBottom: 10,
                    }}
                />
                {moviesLoading || loadingTrending ?
                <ActivityIndicator size="large" color="0000ff" className="mt-10 self-center"/>
                : moviesError || errorTrending ? (
                <Text>Error: {moviesError?.message || errorTrending?.message}</Text>
                ) : (
                <View className="flex-1 mt-5">
                    <SearchBar
                        onPress={() => router.push("/search")}
                        placeholder="Search for a Movie"
                    />

                    {
                        trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent = {()=> <View className="w-4" />}
                                    className="mb-4 mt-3"
                                    data={trendingMovies}
                                    renderItem={({item, index}) => (
                                       <TrendingCard />
                                    )}
                                    keyExtractor={(item)=>item.movie_id.toString()}
                                />
                            </View>
                        )
                    }

                    <>
                        <Text className="text-lg text-white font-bold mb-3">Latest Movies </Text>

                        <FlatList
                            data={movies}
                            className="mt-3 pb-32"
                            renderItem={({item}: any) => (
                                <MovieCard
                                    {...item}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: 'flex-start',
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10,
                            }}
                            scrollEnabled={false}
                        />
                    </>
                </View>
                )
                }

            </ScrollView>
        </View>
    );
}
