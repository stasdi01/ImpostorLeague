import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/gameStore';

export default function ResultsScreen() {
  const router = useRouter();
  const { realWord, players, gameMode, category, resetGame } = useGameStore();

  const isDifferentPlayerMode = gameMode === 'different-player';
  const categoryLabel = category === 'players' ? 'Player' : 'Club';
  const impostors = players.filter((p) => p.role === 'impostor');
  const crewmates = players.filter((p) => p.role === 'crewmate');

  function handlePlayAgain() {
    router.replace('/setup/players');
  }

  function handleNewGame() {
    resetGame();
    router.replace('/');
  }

  return (
    <View className="flex-1 bg-[#1A1A1A]">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <ScrollView
        className="flex-1 px-6 pt-12"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="text-[#8A8A8A] text-sm font-semibold tracking-widest uppercase mb-2">
          The Truth
        </Text>
        <Text className="text-white text-3xl font-bold mb-8">
          Game Revealed
        </Text>

        {/* Real word */}
        <View className="bg-[#2A2A2A] rounded-2xl p-6 mb-4">
          <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-1">
            The Real {categoryLabel}
          </Text>
          <Text className="text-white text-3xl font-bold">{realWord}</Text>
        </View>

        {/* Impostors */}
        <View className="bg-[#2A2A2A] rounded-2xl p-6 mb-4">
          <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-3">
            {impostors.length === 1 ? 'The Impostor' : 'The Impostors'}
          </Text>
          {impostors.map((p) => (
            <View key={p.id} className="mb-3">
              <Text className="text-[#E8620A] text-xl font-bold">{p.name}</Text>
              {isDifferentPlayerMode && (
                <Text className="text-[#8A8A8A] text-sm mt-1">
                  Had: {p.word}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Crewmates */}
        <View className="bg-[#2A2A2A] rounded-2xl p-6 mb-8">
          <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-3">
            Crewmates
          </Text>
          {crewmates.map((p) => (
            <Text key={p.id} className="text-white text-base mb-2">
              {p.name}
            </Text>
          ))}
        </View>

        {/* Actions */}
        <TouchableOpacity
          className="w-full bg-[#E8620A] rounded-2xl py-5 items-center mb-3"
          activeOpacity={0.85}
          onPress={handlePlayAgain}
        >
          <Text className="text-white text-xl font-bold">Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full border border-[#2A2A2A] rounded-2xl py-5 items-center"
          activeOpacity={0.85}
          onPress={handleNewGame}
        >
          <Text className="text-[#8A8A8A] text-xl font-bold">New Game</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
