export interface EventoDia {
  data: string;
  descricao?: string;
}

export function getEventosSemana(
  calendario: Record<string, any>
): EventoDia[] {
  const hoje = new Date();

  const diaSemana = hoje.getDay();
  const diffSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;

  const segunda = new Date(hoje);
  segunda.setDate(hoje.getDate() + diffSegunda);
  segunda.setHours(12, 0, 0, 0);

  const diasSemana: EventoDia[] = [];

  for (let i = 0; i < 5; i++) {
    const dia = new Date(segunda);
    dia.setDate(segunda.getDate() + i);
    dia.setHours(12, 0, 0, 0);

    const dataISO = dia.toISOString().slice(0, 10);

    const evento = calendario[dataISO];

    diasSemana.push({
      data: dataISO,
      descricao: evento?.customLabel ?? "Nenhum evento para este dia",
    });
  }

  return diasSemana;
}
