import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function Calculadora({
  navigation,
}: {
  navigation?: { goBack?: () => void };
}) {
  const [valores, setValores] = useState({
    avp1: "",
    avp2: "",
    tde1: "",
    tde2: "",
    tde3: "",
    tde4: "",
  });
  const [media, setMedia] = useState<number | null>(null);
  const [situacao, setSituacao] = useState("");
  const [gif, setGif] = useState("");

  const calcular = () => {
    const avp1 = parseFloat(valores.avp1) || 0;
    const avp2 = parseFloat(valores.avp2) || 0;
    const tde1 = parseFloat(valores.tde1) || 0;
    const tde2 = parseFloat(valores.tde2) || 0;
    const tde3 = parseFloat(valores.tde3) || 0;
    const tde4 = parseFloat(valores.tde4) || 0;

    let mediaFinal =
      0.4 * avp1 + 0.4 * avp2 + 0.05 * (tde1 + tde2 + tde3 + tde4);
    mediaFinal = arredondarMediaFinal(mediaFinal);
    setMedia(parseFloat(mediaFinal.toFixed(2)));

    if (mediaFinal >= 7) {
      setSituacao("Aprovado");
      setGif(
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjFkNTl3djdkZzhjbWVodjVheXczOTJob3JlbHl2OHVlZGJ0aXZucyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pWO49XP9L7TxbgQVib/giphy.gif"
      );
    } else if (mediaFinal >= 4) {
      setSituacao("Avaliação Final (AVF)");
      setGif(
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTU0ZjdicDRzbzQ1NGRpYm16OGhoOXQ4azRjbnpnanB4Z3owaHZjMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xSM46ernAUN3y/giphy.gif"
      );
    } else {
      setSituacao("Reprovado");
      setGif(
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjdwdXJzM3ByaXA0NHVsYWx0cnFvNDA5N3pxdzB3a3I2bjdnZG1rOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/otP85UTRethni/giphy.gif"
      );
    }
  };

  const limparCampos = () => {
    setValores({ avp1: "", avp2: "", tde1: "", tde2: "", tde3: "", tde4: "" });
    setMedia(null);
    setSituacao("");
    setGif("");
  };

  const arredondarMediaFinal = (mediaFinal: number) => {
    const decimal = mediaFinal - Math.floor(mediaFinal);
    if (decimal === 0) return Math.floor(mediaFinal);
    if (decimal >= 0 && decimal < 0.2) return Math.floor(mediaFinal) + 0.1;
    if (decimal >= 0.2 && decimal < 0.6) return Math.floor(mediaFinal) + 0.5;
    if (decimal >= 0.6 && decimal < 0.7) return Math.floor(mediaFinal) + 0.6;
    return Math.ceil(mediaFinal);
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

        <View style={styles.newStyle}>
          <Button title="Calcular Média" onPress={calcular} />
          <Button title="Limpar Campos" onPress={limparCampos} />
        </View>

        {media !== null && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={styles.result}>
              Média Final: <Text style={styles.resultValue}>{media}</Text>
            </Text>
            <Text style={styles.result}>
              Situação: <Text style={styles.resultValue}>{situacao}</Text>
            </Text>
            {gif !== "" && (
              <Image
                source={{ uri: gif }}
                style={{ width: 200, height: 200, marginTop: 10 }}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  newStyle: { gap: 16},
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "#0055ff",
    textAlign: "center",
  },
  content: { paddingBottom: 30 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  resultValue: { color: "#0055ff" },
});
