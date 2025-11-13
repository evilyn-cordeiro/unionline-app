import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  type?: "default" | "outline"; // define estilo
  color?: string; // cor opcional
}

export default function Button({ title, onPress, type = "default", color }: Props) {
  const isOutline = type === "outline";
  const buttonStyle = [
    styles.button,
    isOutline && styles.outlineButton,
    color && !isOutline ? { backgroundColor: color } : {},
    isOutline && color ? { borderColor: color } : {},
  ];
  const textStyle = [
    styles.text,
    isOutline ? { color: color || "#0055ff" } : {},
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0055ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
