import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '@/store/gameStore';
import type { GameMode } from '@/store/gameStore';

const MODES: { key: GameMode; label: string; description: string }[] = [
  {
    key: 'impostor',
    label: 'Impostor Mode',
    description: 'Impostors get no word — only a subtle hint.',
  },
  {
    key: 'different-player',
    label: 'Different Player Mode',
    description: 'Impostors get a different but related word.',
  },
];

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <View className="flex-row items-center gap-6">
      <TouchableOpacity
        className={`w-12 h-12 rounded-full items-center justify-center border-2 ${
          value <= min ? 'border-[#2A2A2A]' : 'border-[#E8620A]'
        }`}
        onPress={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        activeOpacity={0.7}
      >
        <Ionicons
          name="remove"
          size={22}
          color={value <= min ? '#2A2A2A' : '#E8620A'}
        />
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold w-8 text-center">
        {value}
      </Text>

      <TouchableOpacity
        className={`w-12 h-12 rounded-full items-center justify-center border-2 ${
          value >= max ? 'border-[#2A2A2A]' : 'border-[#E8620A]'
        }`}
        onPress={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        activeOpacity={0.7}
      >
        <Ionicons
          name="add"
          size={22}
          color={value >= max ? '#2A2A2A' : '#E8620A'}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function ConfigureScreen() {
  const router = useRouter();
  const { setGameMode, setPlayerCount, setImpostorCount } = useGameStore();

  const [selectedMode, setSelectedMode] = useState<GameMode>('impostor');
  const [players, setPlayers] = useState(4);
  const [impostors, setImpostors] = useState(1);

  const maxImpostors =
    selectedMode === 'different-player'
      ? Math.min(3, Math.floor((players - 1) / 2))
      : Math.min(3, players - 2);

  function handlePlayersChange(value: number) {
    setPlayers(value);
    const newMax =
      selectedMode === 'different-player'
        ? Math.min(3, Math.floor((value - 1) / 2))
        : Math.min(3, value - 2);
    setImpostors((prev) => Math.min(prev, newMax));
  }

  function handleModeChange(mode: GameMode) {
    setSelectedMode(mode);
    const newMax =
      mode === 'different-player'
        ? Math.min(3, Math.floor((players - 1) / 2))
        : Math.min(3, players - 2);
    setImpostors((prev) => Math.min(prev, newMax));
  }

  function handleImpostorsChange(value: number) {
    setImpostors(Math.min(value, maxImpostors));
  }

  function handleNext() {
    setGameMode(selectedMode);
    setPlayerCount(players);
    setImpostorCount(Math.min(impostors, maxImpostors));
    router.push('/setup/players');
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1A1A1A]">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <ScrollView
        className="flex-1 px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
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
          Step 2 of 3
        </Text>
        <Text className="text-white text-3xl font-bold mb-8">
          Game Setup
        </Text>

        {/* Game mode */}
        <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-3">
          Game Mode
        </Text>
        <View className="gap-3 mb-8">
          {MODES.map((mode) => {
            const selected = selectedMode === mode.key;
            return (
              <TouchableOpacity
                key={mode.key}
                className={`rounded-2xl p-5 border-2 ${
                  selected
                    ? 'bg-[#2A2A2A] border-[#E8620A]'
                    : 'bg-[#2A2A2A] border-[#2A2A2A]'
                }`}
                activeOpacity={0.85}
                onPress={() => handleModeChange(mode.key)}
              >
                <View className="flex-row items-center mb-1">
                  <View
                    className={`w-4 h-4 rounded-full border-2 mr-3 items-center justify-center ${
                      selected ? 'border-[#E8620A]' : 'border-[#8A8A8A]'
                    }`}
                  >
                    {selected && (
                      <View className="w-2 h-2 rounded-full bg-[#E8620A]" />
                    )}
                  </View>
                  <Text
                    className={`text-base font-bold ${
                      selected ? 'text-white' : 'text-[#8A8A8A]'
                    }`}
                  >
                    {mode.label}
                  </Text>
                </View>
                <Text className="text-[#8A8A8A] text-sm ml-7">
                  {mode.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Player count */}
        <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-3">
          Number of Players
        </Text>
        <View className="bg-[#2A2A2A] rounded-2xl p-5 flex-row items-center justify-between mb-6">
          <Text className="text-white text-base font-semibold">Players</Text>
          <Stepper
            value={players}
            min={3}
            max={15}
            onChange={handlePlayersChange}
          />
        </View>

        {/* Impostor count */}
        <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-3">
          Number of Impostors
        </Text>
        <View className="bg-[#2A2A2A] rounded-2xl p-5 flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-white text-base font-semibold">Impostors</Text>
            {maxImpostors < 3 && (
              <Text className="text-[#8A8A8A] text-xs mt-1">
                Max {maxImpostors} with {players} players
              </Text>
            )}
          </View>
          <Stepper
            value={Math.min(impostors, maxImpostors)}
            min={1}
            max={maxImpostors}
            onChange={handleImpostorsChange}
          />
        </View>

        {/* Next */}
        <TouchableOpacity
          className="w-full bg-[#E8620A] rounded-2xl py-5 items-center"
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text className="text-white text-xl font-bold">Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}