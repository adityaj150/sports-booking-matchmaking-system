export const generateTimeSlots = (
  startTime = "06:00",
  endTime = "22:00",
  slotDurationMinutes = 60
) => {
  const slots = [];

  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  let current = startHour * 60 + startMin;
  const end = endHour * 60 + endMin;

  const format = (h, m) =>
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  while (current + slotDurationMinutes <= end) {
    const startH = Math.floor(current / 60);
    const startM = current % 60;

    const endSlot = current + slotDurationMinutes;
    const endH = Math.floor(endSlot / 60);
    const endM = endSlot % 60;

    slots.push({
      startTime: format(startH, startM),
      endTime: format(endH, endM),
      isBooked: false
    });

    current += slotDurationMinutes;
  }

  return slots;
};
