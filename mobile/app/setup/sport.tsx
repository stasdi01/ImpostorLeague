import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '@/store/gameStore';
import type { Sport, Category } from '@/store/gameStore';

const SPORTS: { key: Sport; label: string; emoji: string }[] = [
  { key: 'soccer', label: 'Soccer', emoji: '⚽' },
  { key: 'basketball', label: 'Basketball', emoji: '🏀' },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'players', label: 'Players' },
  { key: 'clubs', label: 'Clubs' },
];

export default function SportScreen() {
  const router = useRouter();
  const { setSport, setCategory } = useGameStore();

  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  function handleSportPress(sport: Sport) {
    setSelectedSport(sport);
    setSelectedCategory(null); // reset category when sport changes
  }

  function handleNext() {
    if (!selectedSport || !selectedCategory) return;
    setSport(selectedSport);
    setCategory(selectedCategory);
    router.push('/setup/configure');
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1A1A1A]">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <View className="flex-1 px-6 pt-4">
        {/* Back button */}
        <TouchableOpacity
          className="self-start mb-6"
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Header */}
        <Text className="text-[#8A8A8A] text-sm font-semibold tracking-widest uppercase mb-2">
          Step 1 of 3
        </Text>
        <Text className="text-white text-3xl font-bold mb-8">
          Choose a Sport
        </Text>

        {/* Sport cards */}
        <View className="flex-row gap-4 mb-8">
          {SPORTS.map((sport) => {
            const selected = selectedSport === sport.key;
            return (
              <TouchableOpacity
                key={sport.key}
                className={`flex-1 rounded-2xl py-10 items-center border-2 ${
                  selected
                    ? 'bg-[#E8620A] border-[#E8620A]'
                    : 'bg-[#2A2A2A] border-[#2A2A2A]'
                }`}
                activeOpacity={0.85}
                onPress={() => handleSportPress(sport.key)}
              >
                <Text className="text-5xl mb-3">{sport.emoji}</Text>
                <Text
                  className={`text-lg font-bold ${
                    selected ? 'text-white' : 'text-[#8A8A8A]'
                  }`}
                >
                  {sport.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category selection — appears after sport is chosen */}
        {selectedSport && (
          <View className="mb-8">
            <Text className="text-white text-3xl font-bold mb-6">
              Choose a Category
            </Text>
            <View className="flex-row gap-4">
              {CATEGORIES.map((cat) => {
                const selected = selectedCategory === cat.key;
                return (
                  <TouchableOpacity
                    key={cat.key}
                    className={`flex-1 rounded-2xl py-5 items-center border-2 ${
                      selected
                        ? 'bg-[#E8620A] border-[#E8620A]'
                        : 'bg-[#2A2A2A] border-[#2A2A2A]'
                    }`}
                    activeOpacity={0.85}
                    onPress={() => setSelectedCategory(cat.key)}
                  >
                    <Text
                      className={`text-lg font-bold ${
                        selected ? 'text-white' : 'text-[#8A8A8A]'
                      }`}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Next button */}
        <View className="mt-auto pb-4">
          <TouchableOpacity
            className={`w-full rounded-2xl py-5 items-center ${
              selectedSport && selectedCategory
                ? 'bg-[#E8620A]'
                : 'bg-[#2A2A2A]'
            }`}
            activeOpacity={0.85}
            disabled={!selectedSport || !selectedCategory}
            onPress={handleNext}
          >
            <Text
              className={`text-xl font-bold ${
                selectedSport && selectedCategory
                  ? 'text-white'
                  : 'text-[#8A8A8A]'
              }`}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}