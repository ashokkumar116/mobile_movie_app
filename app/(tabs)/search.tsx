import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native'
import React from 'react'
import {images} from "@/constants/images";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/Components/MovieCard";
import {icons} from "@/constants/icons";
import SearchBar from "@/Components/SearchBar";

const Search = () => {

    const router = useRouter();

    const {
        data: movies = [],
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({ query: 'amaran' }), false);

    return (

        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList
                data={ movies}
                renderItem={({item})=> <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>

                        <View className="my-5">
                            <SearchBar
                                placeholder="Search for a movie"
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}

                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {error.message}
                            </Text>
                        )}

                        {!loading &&
                            !error &&
                            'search Query'.trim() &&
                            movies?.length! > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for{" "}
                                    <Text className="text-accent">searchQuery</Text>
                                </Text>
                            )}
                    </>
                }
            />
        </View>
    )
}
export default Search
