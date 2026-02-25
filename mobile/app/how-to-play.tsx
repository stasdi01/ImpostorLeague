import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const STEPS = [
  {
    number: '1',
    title: 'Pick a sport & category',
    description: 'Choose Soccer or Basketball, then decide if you\'re playing with Players or Clubs.',
  },
  {
    number: '2',
    title: 'Everyone gets a secret word',
    description: 'One by one, each player looks at their card privately. Most players share the same word — except the Impostor(s).',
  },
  {
    number: '3',
    title: 'Give one-word clues',
    description: 'Going around the table, each player says a single word that hints at their secret word. No sentences, no extra context.',
  },
  {
    number: '4',
    title: 'Discuss & vote',
    description: 'After everyone has given a clue, debate who you think the Impostor is. When ready, vote — most votes gets revealed.',
  },
  {
    number: '5',
    title: 'Reveal the truth',
    description: 'Hit "Reveal Impostor(s)" to see who was who and what the real word was.',
  },
];

export default function HowToPlayScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#1A1A1A]">
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <ScrollView
        className="flex-1 px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 32 }}
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
          The Rules
        </Text>
        <Text className="text-white text-3xl font-bold mb-2">
          How to Play
        </Text>
        <Text className="text-[#8A8A8A] text-sm mb-8">
          A social deduction game for sports fans. Find the Impostor before they fool everyone.
        </Text>

        {/* Steps */}
        <View className="gap-3 mb-8">
          {STEPS.map((step) => (
            <View key={step.number} className="bg-[#2A2A2A] rounded-2xl p-5 flex-row">
              <Text className="text-[#E8620A] text-xl font-bold w-8">{step.number}.</Text>
              <View className="flex-1">
                <Text className="text-white text-base font-bold mb-1">{step.title}</Text>
                <Text className="text-[#8A8A8A] text-sm leading-5">{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Game Modes */}
        <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-3">
          Game Modes
        </Text>

        <View className="bg-[#2A2A2A] rounded-2xl p-5 mb-3">
          <Text className="text-white text-base font-bold mb-2">Impostor Mode</Text>
          <Text className="text-[#8A8A8A] text-sm leading-5">
            The Impostor gets <Text className="text-white font-semibold">no word</Text> — only a subtle hint. They must listen carefully and bluff their way through. Crewmates see their role on the card.
          </Text>
        </View>

        <View className="bg-[#2A2A2A] rounded-2xl p-5 mb-8">
          <Text className="text-white text-base font-bold mb-2">Different Player Mode</Text>
          <Text className="text-[#8A8A8A] text-sm leading-5">
            The Impostor gets a <Text className="text-white font-semibold">different but related word</Text>. Nobody knows who the Impostor is — not even the Impostor themselves. No roles are shown on cards.
          </Text>
        </View>

        {/* Tips */}
        <Text className="text-[#8A8A8A] text-xs font-semibold tracking-widest uppercase mb-3">
          Tips
        </Text>
        <View className="bg-[#2A2A2A] rounded-2xl p-5">
          <Text className="text-[#8A8A8A] text-sm leading-6">
            <Text className="text-white font-semibold">Crewmates</Text> — be specific enough to prove you know the word, but not so obvious the Impostor can copy you.{'\n\n'}
            <Text className="text-white font-semibold">Impostors</Text> — stay vague, listen to others' clues, and mirror their energy.{'\n\n'}
            <Text className="text-white font-semibold">Everyone</Text> — a confident wrong answer is still a tell.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}