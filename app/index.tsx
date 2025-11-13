import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import calendario202502 from "../data/calendario202502.json";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { formatarDataComDiaSemana } from "@/utils/formater";

interface Evento {
  data: string; // formato YYYY-MM-DD
  descricao: string;
}

export default function Home({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const aluno = {
    nome: "Olá, estudante",
    foto: "https://cdn-icons-png.flaticon.com/512/219/219970.png",
  };

  const getEventosSemana = (): Evento[] => {
    const hoje = new Date();
    const primeiroDiaSemana = new Date(hoje);
    primeiroDiaSemana.setDate(hoje.getDate() - hoje.getDay() + 1);
    const ultimoDiaSemana = new Date(primeiroDiaSemana);
    ultimoDiaSemana.setDate(primeiroDiaSemana.getDate() + 6);

    return Object.entries(calendario202502)
      .map(([data, info]) => ({
        data,
        descricao: info.customLabel,
      }))
      .filter(({ data }) => {
        const dataEvento = new Date(data);
        return dataEvento >= primeiroDiaSemana && dataEvento <= ultimoDiaSemana;
      });
  };

  const eventosSemana = getEventosSemana();

  const openLink = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const atalhosExternos: {
    nome: string;
    descricao: string;
    url: string;
    image: string;
  }[] = [
    {
      nome: "FapOnline",
      descricao:
        "Envio e acompanhamento de tarefas, avaliações e avisos dos professores.",
      url: "https://faponline.fapce.edu.br/?new_loc=%2Fultra%2Finstitution-page",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQag3EltrIoJ_e240iLixSgDCfMrVvfv5O4-Q&s",
    },
    {
      nome: "Conta FAP",
      descricao:
        "Acompanhe eventos, cadastros e certificações internas dos eventos.",
      url: "https://conta.unifapce.edu.br/entrar",
      image: "https://conta.unifapce.edu.br/favicon.ico",
    },
    {
      nome: "Portal Acadêmico",
      descricao: "Veja notas, matrículas e relatórios financeiros.",
      url: "https://unifapce.edu.br/portal-academico/",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuri3kjeMJ9FoVHELZuJGcPufP2p9mV5H29w&s",
    },
    {
      nome: "Repositório Acadêmico",
      descricao: "Acesse calendários acadêmicos, de aulas e de avaliações.",
      url: "https://unifapce.edu.br/repositorio-academico/?_sft_tipos_repacademico=calendario-academico,calendario-de-aulas,calendario-de-avaliacoes",
      image:
        "https://img.freepik.com/fotos-premium/png-icone-de-pasta-de-documento-azul-adesivo-fundo-transparente_53876-948563.jpg",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: aluno.foto }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{aluno.nome}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Esta Semana</Text>
        {eventosSemana.length > 0 ? (
          eventosSemana.map((evento, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventDate}>
                {formatarDataComDiaSemana(evento.data)}
              </Text>
              <Text style={styles.eventDescription}>{evento.descricao}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhum evento disponível</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atalhos Rápidos</Text>
        <View style={styles.shortcutsContainer}>
          {atalhosExternos.map((atalho, index) => (
            <TouchableOpacity
              key={index}
              style={styles.shortcut}
              onPress={() => openLink(atalho.url)}
            >
              <Image
                source={{ uri: atalho.image }}
                style={{ width: 40, height: 40, marginBottom: 6 }}
              />
              <Text style={styles.shortcutText}>{atalho.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 16 },
  name: { fontSize: 18, fontWeight: "600", color: "#333" },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  eventItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  eventDate: { fontWeight: "600", color: "#0055ff" },
  eventDescription: { color: "#555", marginTop: 2 },
  shortcutsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  shortcut: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  shortcutText: {
    marginTop: 6,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});
