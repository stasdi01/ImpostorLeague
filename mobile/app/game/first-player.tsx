import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/gameStore';

export default function FirstPlayerScreen() {
  const router = useRouter();
  const { firstPlayer } = useGameStore();

  return (
    <View className="flex-1 bg-[#1A1A1A] items-center justify-center px-8">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <Text className="text-[#8A8A8A] text-sm font-semibold tracking-widest uppercase mb-6">
        Goes First
      </Text>

      <Text className="text-[#E8620A] text-6xl font-bold text-center mb-4">
        {firstPlayer}
      </Text>

      <View className="h-1 w-24 bg-[#E8620A] rounded-full mb-12" />

      <Text className="text-[#8A8A8A] text-base text-center mb-16">
        Give one-word clues. Discuss. Find the impostor.
      </Text>

      <TouchableOpacity
        className="w-full bg-[#E8620A] rounded-2xl py-5 items-center"
        activeOpacity={0.85}
        onPress={() => router.replace('/game/discussion')}
      >
        <Text className="text-white text-xl font-bold">Let's Play</Text>
      </TouchableOpacity>
    </View>
  );
}
