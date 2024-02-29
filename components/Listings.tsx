import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { Listing } from '@/interfaces/listing';
import { defaultStyles } from '@/constants/Styles';

interface Props {
  listings: any[];
  refresh: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, [category]);

  // Render one listing row for the FlatList
  const RenderRow: React.FC<{ items: Listing }> = React.memo(({ items }) => {
    const fadeInRight = useMemo(() => FadeInRight, []); // Memoize animated components

    return (
      <Link href={`/listing/${items.id}`} asChild>
        <TouchableOpacity>
          <Animated.View style={styles.listing} entering={fadeInRight} exiting={FadeOutLeft}>
            <Animated.Image source={{ uri: items.medium_url }} style={styles.image} />
            <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
              <Ionicons name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{items.name}</Text>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: 'mon-sb' }}>{items.review_scores_rating / 20}</Text>
              </View>
            </View>
            <Text style={{ fontFamily: 'mon' }}>{items.room_type}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'mon-sb' }}>€ {items.price}</Text>
              <Text style={{ fontFamily: 'mon' }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  }, (prevProps, nextProps) => {
    // Add your custom comparison logic here if needed
    // This function should return true if the component doesn't need to update
    return prevProps.items.id === nextProps.items.id;
  });

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={({ item }) => <RenderRow items={item} />}
        data={loading ? [] : items}
        ref={listRef}
        ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;
