export const groupByDate = (tasks) => {
    const grouped = {};
    tasks.forEach(task => {
      const date = new Date(task.fecha);
      const day = date.toLocaleDateString("es-ES", { weekday: 'long' });
      const key = `${day}, ${task.fecha}`;
  
      if (!grouped[key]) {
        grouped[key] = [];
      }
  
      grouped[key].push(task);
    });
    return grouped;
  };
  