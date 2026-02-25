import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '@/store/gameStore';

export default function PlayersScreen() {
  const router = useRouter();
  const { playerCount, playerNames, setPlayerNames } = useGameStore();

  const [names, setNames] = useState<string[]>(
    Array.from({ length: playerCount }, (_, i) => playerNames[i] ?? ''),
  );

  function updateName(index: number, value: string) {
    setNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleStartGame() {
    setPlayerNames(names);
    router.push('/game/loading');
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1A1A1A]">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1 px-6 pt-4"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
            Step 3 of 3
          </Text>
          <Text className="text-white text-3xl font-bold mb-2">
            Enter Player Names
          </Text>
          <Text className="text-[#8A8A8A] text-sm mb-8">
            Optional — leave blank to use defaults.
          </Text>

          {/* Name inputs */}
          <View className="gap-3 mb-8">
            {names.map((name, i) => (
              <View
                key={i}
                className="bg-[#2A2A2A] rounded-2xl flex-row items-center px-5"
              >
                <Text className="text-[#E8620A] font-bold text-base w-8">
                  {i + 1}.
                </Text>
                <TextInput
                  className="flex-1 text-white text-base py-4"
                  placeholder={`Player ${i + 1}`}
                  placeholderTextColor="#8A8A8A"
                  value={name}
                  onChangeText={(v) => updateName(i, v)}
                  maxLength={20}
                  returnKeyType="next"
                  autoCapitalize="words"
                />
              </View>
            ))}
          </View>

          {/* Start Game */}
          <TouchableOpacity
            className="w-full bg-[#E8620A] rounded-2xl py-5 items-center"
            activeOpacity={0.85}
            onPress={handleStartGame}
          >
            <Text className="text-white text-xl font-bold">Start Game</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}