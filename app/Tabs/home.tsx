import { Ionicons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import type { ComponentProps } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home({ navigation }: { navigation: NavigationProp<ParamListBase> }) {
  const aluno = {
    nome: 'Evilyn Cordeiro',
    curso: 'Sistemas de Informação',
    foto: 'https://cdn-icons-png.flaticon.com/512/219/219970.png', // exemplo
  };

  const eventosSemana = [
    { data: 'Seg, 28/10', descricao: 'Aula de Banco de Dados' },
    { data: 'Ter, 29/10', descricao: 'Trabalho de Engenharia de Software' },
    { data: 'Qua, 30/10', descricao: 'Prova de Estatística' },
    { data: 'Sex, 01/11', descricao: 'Feriado - Dia de Todos os Santos' },
  ];
  const atalhos: { nome: string; icon: ComponentProps<typeof Ionicons>['name']; rota: string }[] = [
    { nome: 'Calendário', icon: 'calendar', rota: 'Calendario' },
    { nome: 'Notas', icon: 'stats-chart', rota: 'Notas' },
    { nome: 'Horários', icon: 'time', rota: 'Horarios' },
    { nome: 'Perfil', icon: 'person', rota: 'Perfil' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image source={{ uri: aluno.foto }} style={styles.avatar} />
        <View>
          <Text style={styles.welcome}>Olá,</Text>
          <Text style={styles.name}>{aluno.nome}</Text>
          <Text style={styles.course}>{aluno.curso}</Text>
        </View>
      </View>

      {/* Eventos da Semana */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Esta Semana</Text>
        {eventosSemana.map((evento, index) => (
          <View key={index} style={styles.eventItem}>
            <Text style={styles.eventDate}>{evento.data}</Text>
            <Text style={styles.eventDescription}>{evento.descricao}</Text>
          </View>
        ))}
      </View>

      {/* Atalhos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Atalhos Rápidos</Text>
        <View style={styles.shortcutsContainer}>
          {atalhos.map((atalho, index) => (
            <TouchableOpacity
              key={index}
              style={styles.shortcut}
              onPress={() => navigation?.navigate(atalho.rota)}
            >
              <Ionicons name={atalho.icon} size={28} color="#0055ff" />
              <Text style={styles.shortcutText}>{atalho.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc', padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 16 },
  welcome: { fontSize: 14, color: '#888' },
  name: { fontSize: 18, fontWeight: '600', color: '#333' },
  course: { fontSize: 14, color: '#0055ff', marginTop: 2 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  eventItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  eventDate: { fontWeight: '600', color: '#0055ff' },
  eventDescription: { color: '#555', marginTop: 2 },
  shortcutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shortcut: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  shortcutText: { marginTop: 6, fontSize: 14, color: '#333' },
});
