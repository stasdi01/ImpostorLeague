import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

type Phase = 'pass' | 'revealed' | 'done';

export default function CardsScreen() {
  const router = useRouter();
  const { players, gameMode, advanceCard, currentCardIndex } = useGameStore();

  const [phase, setPhase] = useState<Phase>('pass');

  const currentPlayer = players[currentCardIndex];
  const isLastPlayer = currentCardIndex === players.length - 1;

  function handleReveal() {
    setPhase('revealed');
  }

  function handleDone() {
    if (isLastPlayer) {
      router.replace('/game/first-player');
    } else {
      advanceCard();
      setPhase('pass');
    }
  }

  // ── Between-player pass screen ──────────────────────────────────────────────
  if (phase === 'pass') {
    return (
      <View className="flex-1 bg-[#1A1A1A] items-center justify-center px-8">
        <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
        <Text className="text-[#8A8A8A] text-sm font-semibold tracking-widest uppercase mb-4">
          Pass the phone to
        </Text>
        <Text className="text-white text-4xl font-bold text-center mb-16">
          {currentPlayer?.name}
        </Text>
        <TouchableOpacity
          className="w-full bg-[#E8620A] rounded-2xl py-5 items-center"
          activeOpacity={0.85}
          onPress={handleReveal}
        >
          <Text className="text-white text-xl font-bold">Tap to Reveal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Card revealed ───────────────────────────────────────────────────────────
  const isImpostor = currentPlayer?.role === 'impostor';
  const isDifferentPlayerMode = gameMode === 'different-player';

  return (
    <View className="flex-1 bg-[#1A1A1A] px-6 pt-16 pb-8">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      {/* Player name */}
      <Text className="text-[#8A8A8A] text-sm font-semibold tracking-widest uppercase mb-1">
        {currentPlayer?.name}
      </Text>
      <View className="h-px bg-[#2A2A2A] mb-8" />

      {/* Card */}
      <View className="flex-1 justify-center">
        <View
          className={`rounded-3xl p-8 border-2 ${
            isImpostor && !isDifferentPlayerMode
              ? 'bg-[#2A2A2A] border-[#E8620A]'
              : 'bg-[#2A2A2A] border-[#2A2A2A]'
          }`}
        >
          {/* Role — only shown in Impostor Mode */}
          {!isDifferentPlayerMode && (
            <View className="mb-6">
              <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-1">
                Role
              </Text>
              <Text
                className={`text-2xl font-bold ${
                  isImpostor ? 'text-[#E8620A]' : 'text-white'
                }`}
              >
                {isImpostor ? 'Impostor' : 'Crewmate'}
              </Text>
            </View>
          )}

          {/* Word */}
          <View className="mb-6">
            <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-1">
              Word
            </Text>
            <Text className="text-white text-3xl font-bold">
              {currentPlayer?.word}
            </Text>
          </View>

          {/* Hint — Impostor Mode impostors only */}
          {!isDifferentPlayerMode && isImpostor && (
            <View>
              <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-1">
                Hint
              </Text>
              <Text className="text-[#E8620A] text-lg font-semibold">
                {currentPlayer?.hint ?? 'No hint available this round.'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Done button */}
      <TouchableOpacity
        className="w-full bg-[#2A2A2A] rounded-2xl py-5 items-center mt-8"
        activeOpacity={0.85}
        onPress={handleDone}
      >
        <Text className="text-white text-xl font-bold">
          {isLastPlayer ? 'All Done' : 'Done'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}