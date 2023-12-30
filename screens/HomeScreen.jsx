import FeatureRow from "../components/FeatureRow";
import CardList from "../components/CardList";
import { memo, useCallback, useContext, useEffect, useState } from "react";


import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { featuredData } from "../libs";
import Loader from "./../components/Loader";

// categories data
// const categories = [
//   {
//     id: 'US-UK',
//     title: 'US-UK',
//     image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 'Like-Song',
//     title: 'Like-Song',
//     image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 'Ther loai 3',
//     title: 'Ther loai 3',
//     image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 'Ther loai 4',
//     title: 'Ther loai 4',
//     image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
// ]

const HomeScreen = () => {
  const [playlists, setPlaylists] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState();



  useEffect(() => {
    (async () => {
      const data = await featuredData();

      data &&
        data.map((item) => {
          if (item.type === "playlist") {
            setPlaylists((prev) => [...prev, item.data]);
          } else {
            setTopPlaylists(item.data);
          }
        });
    })();
  }, []);

  if (playlists.length === 0) return <Loader />;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="space-y-4 p-4 bg-main"
    >
      {/* Categories */}
      {/* <View className="flex-row flex-wrap w-screen gap-2">
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            id={category.id}
            title={category.title}
            image={category.image} />
        ))}
      </View> */}


      {/* Recommend */}
      <View>
        {playlists &&
          playlists.map((feature) => {
            const type =
              feature.sectionType ||
              (feature.sectionId === "hArtistTheme" ? "artist" : "");
            return (
              <FeatureRow
                key={feature?.sectionId || feature?.id}
                title={feature?.title}
                type={type}
                component={<CardList data={feature?.items} type={type} />}
              />
            );
          })}
        {topPlaylists &&
          topPlaylists.map((feature) => {
            const type =
              feature.sectionType ||
              (feature.sectionId === "hArtistTheme" ? "artist" : "");
            return (
              <FeatureRow
                key={feature?.sectionId || feature?.id}
                title={feature?.title}
                type={type}
                component={<CardList data={feature?.items} type={type} />}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
