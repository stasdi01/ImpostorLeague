import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { setupGame } from '@/services/api';

export default function LoadingScreen() {
  const router = useRouter();
  const {
    sport,
    category,
    gameMode,
    playerCount,
    impostorCount,
    playerNames,
    setGameData,
  } = useGameStore();

  useEffect(() => {
    async function startGame() {
      try {
        const session = await setupGame({
          sport: sport!,
          category: category!,
          gameMode: gameMode!,
          playerCount,
          impostorCount,
          playerNames,
        });

        setGameData({
          realWord: session.realWord,
          players: session.players,
          firstPlayer: session.firstPlayer,
        });

        router.replace('/game/cards');
      } catch (err) {
        console.error('Game setup failed:', err);
        // Navigate back to home on unrecoverable error
        router.replace('/');
      }
    }

    startGame();
  }, []);

  return (
    <View className="flex-1 bg-[#1A1A1A] items-center justify-center px-8">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <Text className="text-[#E8620A] text-4xl font-bold tracking-widest text-center mb-2">
        IMPOSTOR
      </Text>
      <Text className="text-white text-4xl font-bold tracking-widest text-center mb-12">
        LEAGUE
      </Text>

      <ActivityIndicator size="large" color="#E8620A" />

      <Text className="text-[#8A8A8A] text-base mt-6 text-center">
        Setting up the game...
      </Text>
    </View>
  );
}