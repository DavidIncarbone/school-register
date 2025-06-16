export const formatDateToDDMMYYYY = (date: number | string | Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Mese parte da 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

export const checkIsFuture = (date: number | string | Date) => {
    const d = new Date(date);
    const now = new Date();
    const dDay = Number(String(d.getDate()).padStart(2, "0"));
    const dMonth = Number(String(d.getMonth() + 1).padStart(2, "0")); // Mese parte da 0
    const dYear = d.getFullYear();
    const nowDay = Number(String(now.getDate()).padStart(2, "0"));
    const nowMonth = Number(String(now.getMonth() + 1).padStart(2, "0")); // Mese parte da 0
    const nowYear = now.getFullYear();
    return !(
        nowDay - dDay >= 0 &&
        nowMonth - dMonth >= 0 &&
        nowYear - dYear >= 0
    );
};
