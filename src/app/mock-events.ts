export const EVENTS: any[] = [
    {
        title: "Evento 1",
        start: new Date(),
        description: "Esta es la descripción",
        backgroundColor: "black"
      },
      {
        title: "Evento 1",
        start: new Date(),
        description: "Esta es la descripción",
        backgroundColor: "black"
      },
      {
        title: "Evento 1",
        start: new Date(),
        description: "Esta es la descripción",
        backgroundColor: "black"
      },
      {
        title: "Evento 2",
        start: new Date(new Date().getTime() + 86400000),
        description: "Evento 3"
      },
      {
        title: "Evento 3",
        start: new Date(new Date().getTime() + (86400000 * 2)),
        end: new Date(new Date().getTime() + (86400000 * 4)),
        description: "Evento 3"
      },
]