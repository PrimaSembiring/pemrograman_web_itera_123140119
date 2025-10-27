export const refreshTime = () => {
  const pill = document.querySelector("#timePill");
  const now = new Date();

  const hari = now.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const jam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Jakarta",
  });

  pill.textContent = `${hari}, ${tanggal} • ${jam} • Bandar Lampung`;
};
