const normalizeStatus = (status: string) => {
  const colorMap: Record<string, string> = {
    "ควรบริโภค": "text-black",
    "ไม่ควรบริโภค": "text-red-500",
    "หมดแล้ว": "text-orange-500",
  };

  return colorMap[status] || "text-black";
};

export default normalizeStatus;