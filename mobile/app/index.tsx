import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#1A1A1A]">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      {/* Logo + title */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="items-center mb-16">
          <Text className="text-[#E8620A] text-6xl font-bold tracking-widest text-center">
            IMPOSTOR
          </Text>
          <Text className="text-white text-6xl font-bold tracking-widest text-center">
            LEAGUE
          </Text>
          <View className="h-1 w-24 bg-[#E8620A] mt-4 rounded-full" />
          <Text className="text-[#8A8A8A] text-base mt-4 text-center tracking-wide">
            A sports social deduction game
          </Text>
        </View>

        {/* New Game button */}
        <TouchableOpacity
          className="w-full bg-[#E8620A] rounded-2xl py-5 items-center mb-4"
          activeOpacity={0.85}
          onPress={() => router.push('/setup/sport')}
        >
          <Text className="text-white text-xl font-bold tracking-wide">
            New Game
          </Text>
        </TouchableOpacity>

        {/* How to Play */}
        <TouchableOpacity
          className="w-full border border-[#2A2A2A] rounded-2xl py-5 items-center"
          activeOpacity={0.85}
          onPress={() => router.push('/how-to-play')}
        >
          <Text className="text-[#8A8A8A] text-xl font-bold tracking-wide">
            How to Play
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}