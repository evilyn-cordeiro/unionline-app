import Button from '@/components/button';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Calculadora({ navigation }: { navigation?: { goBack?: () => void } }) {
  const [valores, setValores] = useState({
    avp1: '',
    avp2: '',
    tde1: '',
    tde2: '',
    tde3: '',
    tde4: '',
  });
  const [media, setMedia] = useState<number | null>(null);

  const calcular = () => {
    const numeros = Object.values(valores).map(Number).filter((n) => !isNaN(n));
    if (numeros.length > 0) {
      const resultado = numeros.reduce((a, b) => a + b, 0) / numeros.length;
      setMedia(parseFloat(resultado.toFixed(2)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={28} color="#0055ff" />
        </TouchableOpacity>
        <Text style={styles.title}>Simulador de Média Acadêmica</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* AVPs */}
        <Text style={styles.sectionTitle}>Avaliações Principais</Text>
        <TextInput
          placeholder="AVP1"
          keyboardType="numeric"
          style={styles.input}
          value={valores.avp1}
          onChangeText={(t) => setValores({ ...valores, avp1: t })}
        />
        <TextInput
          placeholder="AVP2"
          keyboardType="numeric"
          style={styles.input}
          value={valores.avp2}
          onChangeText={(t) => setValores({ ...valores, avp2: t })}
        />

        {/* TDEs */}
        <Text style={styles.sectionTitle}>Trabalhos (TDEs)</Text>
        <TextInput
          placeholder="TDE1"
          keyboardType="numeric"
          style={styles.input}
          value={valores.tde1}
          onChangeText={(t) => setValores({ ...valores, tde1: t })}
        />
        <TextInput
          placeholder="TDE2"
          keyboardType="numeric"
          style={styles.input}
          value={valores.tde2}
          onChangeText={(t) => setValores({ ...valores, tde2: t })}
        />
        <TextInput
          placeholder="TDE3"
          keyboardType="numeric"
          style={styles.input}
          value={valores.tde3}
          onChangeText={(t) => setValores({ ...valores, tde3: t })}
        />
        <TextInput
          placeholder="TDE4"
          keyboardType="numeric"
          style={styles.input}
          value={valores.tde4}
          onChangeText={(t) => setValores({ ...valores, tde4: t })}
        />

        <Button title="Calcular Média" onPress={calcular} />

        {media !== null && (
          <Text style={styles.result}>
            Média Final: <Text style={styles.resultValue}>{media}</Text>
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fa', paddingHorizontal: 16, paddingTop: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: { flex: 1, fontSize: 20, fontWeight: '600', color: '#0055ff', textAlign: 'center' },
  content: { paddingBottom: 30 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  resultValue: { color: '#0055ff' },
});
