import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/gameStore';

const SPORT_EMOJI: Record<string, string> = {
  soccer: '⚽',
  basketball: '🏀',
};

export default function DiscussionScreen() {
  const router = useRouter();
  const { sport, category, gameMode } = useGameStore();

  const sportEmoji = sport ? SPORT_EMOJI[sport] : '';
  const sportLabel = sport === 'soccer' ? 'Soccer' : 'Basketball';
  const categoryLabel = category === 'players' ? 'Players' : 'Clubs';
  const modeLabel =
    gameMode === 'impostor' ? 'Impostor Mode' : 'Different Player Mode';

  return (
    <View className="flex-1 bg-[#1A1A1A] px-6 pb-8">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      {/* App branding — centred in upper half */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-[#E8620A] text-5xl font-bold tracking-widest text-center">
          IMPOSTOR
        </Text>
        <Text className="text-white text-5xl font-bold tracking-widest text-center mb-8">
          LEAGUE
        </Text>

        {/* Game info pills */}
        <View className="flex-row gap-3 flex-wrap justify-center mb-4">
          <View className="bg-[#2A2A2A] rounded-full px-4 py-2">
            <Text className="text-white text-sm font-semibold">
              {sportEmoji} {sportLabel}
            </Text>
          </View>
          <View className="bg-[#2A2A2A] rounded-full px-4 py-2">
            <Text className="text-white text-sm font-semibold">
              {categoryLabel}
            </Text>
          </View>
          <View className="bg-[#2A2A2A] rounded-full px-4 py-2">
            <Text className="text-[#E8620A] text-sm font-semibold">
              {modeLabel}
            </Text>
          </View>
        </View>

        <Text className="text-[#8A8A8A] text-sm text-center mt-4">
          Discuss, give clues, and vote.
        </Text>
      </View>

      {/* Reveal button — host triggers this when consensus is reached */}
      <TouchableOpacity
        className="w-full bg-[#E8620A] rounded-2xl py-5 items-center"
        activeOpacity={0.85}
        onPress={() => router.replace('/game/results')}
      >
        <Text className="text-white text-xl font-bold">Reveal Impostor(s)</Text>
      </TouchableOpacity>
    </View>
  );
}
