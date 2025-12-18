import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  newStyle: { gap: 16 },
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    paddingHorizontal: 16,
    paddingTop: 80,
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
    fontWeight: "500",
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
