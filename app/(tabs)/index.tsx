import { View, Text, Linking, SafeAreaView } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingData from "@/assets/data/airbnb-listings.json"

const index = () => {
  const [category, setCategory] = useState("Tiny Homes");
  const items = useMemo(() => listingData as any, [])
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop: 200 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default index;
