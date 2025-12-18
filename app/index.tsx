import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import calendario202502 from "@/data/calendario202502.json";
import { ALUNO } from "@/constants/aluno";
import { ATALHOS_EXTERNOS } from "@/constants/atalhosExternos";
import { styles } from "@/styles/home.styles";
import { formatarDataComDiaSemana } from "@/utils/formater";
import { getEventosSemana } from "@/utils/datas";
import { openExternalLink } from "@/utils/web";

export default function Home({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const eventosSemana = getEventosSemana(calendario202502);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: ALUNO.foto }} style={styles.avatar} />
        <Text style={styles.name}>{ALUNO.nome}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Esta Semana</Text>
        {eventosSemana.length > 0 ? (
          eventosSemana.map((evento) => (
            <View key={evento.data} style={styles.eventItem}>
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
          {ATALHOS_EXTERNOS.map((atalho) => (
            <TouchableOpacity
              key={atalho.nome}
              style={styles.shortcut}
              onPress={() => openExternalLink(atalho.url)}
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
