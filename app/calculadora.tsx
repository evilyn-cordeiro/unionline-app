import Button from '@/components/button';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Calculadora() {
  const [notas, setNotas] = useState(['', '', '']);
  const [media, setMedia] = useState<number | null>(null);

  const calcular = () => {
    const numeros = notas.map(Number).filter((n) => !isNaN(n));
    if (numeros.length > 0) {
      const resultado = numeros.reduce((a, b) => a + b, 0) / numeros.length;
      setMedia(parseFloat(resultado.toFixed(2)));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Média</Text>
      {notas.map((valor, i) => (
        <TextInput
          key={i}
          placeholder={`Nota ${i + 1}`}
          keyboardType="numeric"
          style={styles.input}
          value={valor}
          onChangeText={(t) => {
            const clone = [...notas];
            clone[i] = t;
            setNotas(clone);
          }}
        />
      ))}
      <Button title="Calcular" onPress={calcular} />
      {media !== null && <Text style={styles.result}>Média: {media}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6fa' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  result: { marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});
